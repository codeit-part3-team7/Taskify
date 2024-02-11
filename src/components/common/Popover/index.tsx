import { ReactNode, useContext, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { FieldValues } from "react-hook-form";
import Contents from "./Contents";
import { UpdateTodo } from "@/components/modal/todo";
import AlertModal from "@/components/modal/alert";
import { card } from "@/lib/services/cards";
import { postImageToServer } from "@/lib/util/postImageToServer";
import { CardServiceResponseDto, UpdateCardRequestDto } from "@/lib/services/cards/schema";
import { DashboardContext } from "@/pages/dashboard/[id]";

export interface PopoverContent {
  title: string;
  onClick: () => void;
}

interface PopoverProps {
  children: ReactNode;
  cardId?: number;
}

type ImageObject = {
  url: string;
  name: string;
  type: string;
};

function Popover({ children, cardId }: PopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | ImageObject | undefined>(undefined);
  const [updateValue, updateToggle, setUpdateValue] = useToggle();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { setCardData } = useContext(DashboardContext);

  const MODAL_POPOVER = [
    {
      title: "수정하기",
      onClick: updateToggle,
    },
    { title: "삭제하기", onClick: deleteToggle },
  ];

  const handlePopoverOpen = () => {
    setPopoverOpen((prev) => !prev);
  };

  const cardUpdate = async (data: FieldValues) => {
    try {
      const { assignee, ...rest } = data;
      const formData: UpdateCardRequestDto = {
        ...(rest as UpdateCardRequestDto),
        assigneeUserId: assignee.id,
        columnId: data.columnId,
      };

      if (selectedImage) {
        const imageUrl = await postImageToServer(selectedImage as File, formData.columnId);
        if (imageUrl) {
          formData.imageUrl = imageUrl;
        }
      }
      const response = await card("put", cardId as number, formData);

      if (response.data) {
        setCardData((prevCardData) => {
          let cardToUpdate: CardServiceResponseDto | null = null;
          let originalColumnId: number | undefined;

          const newCardDataWithoutCard = prevCardData.map((columnData) => {
            const filteredCards = columnData.cards.filter((card) => {
              if (card.id === cardId) {
                cardToUpdate = card;
                originalColumnId = columnData.columnId;
                return false;
              }
              return true;
            });

            return { ...columnData, cards: filteredCards };
          });

          if (cardToUpdate && originalColumnId !== data.columnId) {
            const newCardDataWithCard = newCardDataWithoutCard.map((columnData) => {
              if (columnData.columnId === data.columnId) {
                return {
                  ...columnData,
                  cards: [...columnData.cards, { ...cardToUpdate, ...(response.data as CardServiceResponseDto) }],
                };
              }
              return columnData;
            });

            return newCardDataWithCard;
          }

          return newCardDataWithoutCard;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cardDelete = async () => {
    try {
      await card("delete", cardId as number);
      setCardData((prevCardData) => {
        return prevCardData.map((columnData) => {
          const filteredCards = columnData.cards.filter((card) => card.id !== cardId);
          return { ...columnData, cards: filteredCards };
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (popoverOpen && popoverRef.current && !popoverRef.current.contains(e.target as ChildNode)) {
      setPopoverOpen(false);
    }
  };

  useOnClickOutside(popoverRef, handleOutsideClick);

  return (
    <div className="relative flex items-center" ref={popoverRef}>
      <button type="button" onClick={handlePopoverOpen}>
        {children}
      </button>
      {popoverOpen && <Contents contents={MODAL_POPOVER} />}
      {updateValue && (
        <UpdateTodo
          cardId={cardId}
          setSelectedImage={setSelectedImage}
          onClose={() => setUpdateValue(false)}
          callback={cardUpdate}
        />
      )}
      {deleteValue && (
        <AlertModal modalType="delete" deleteType="card" onClose={() => setDeleteValue(false)} callback={cardDelete} />
      )}
    </div>
  );
}

export default Popover;
