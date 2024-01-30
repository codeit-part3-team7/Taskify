import { useToggle } from "usehooks-ts";
import NewDashModal from "@/components/modal/newDash";
import { CreateColumn, UpdateColumn } from "@/components/modal/column";
import { CreateTodo, UpdateTodo } from "@/components/modal/todo";
import AlertModal from "./alert";
import TaskModal from "./task";
import InviteModal from "./invite";

export default function ModalTest() {
  const [createValue, createToggle, setCreateValue] = useToggle();
  const [alertValue, alertToggle, setAlertValue] = useToggle();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();
  const [columnValue, columnToggle, setColumnValue] = useToggle();
  const [columnUpdateValue, columnUpdateToggle, setColumnUpdateValue] = useToggle();
  const [todoValue, todoToggle, setTodoValue] = useToggle();
  const [todoUpdateValue, todoUpdateToggle, setTodoUpdateValue] = useToggle();
  const [taskValue, taskToggle, setTaskValue] = useToggle();
  const [inviteValue, inviteToggle, setInviteValue] = useToggle();

  return (
    <>
      <div>
        <button onClick={createToggle}>newDashBoard</button>
        {createValue && (
          <NewDashModal onClose={() => setCreateValue(false)} callback={() => console.log("대시보드를 생성")} />
        )}
      </div>
      <div>
        <button onClick={alertToggle}>alertDefault</button>
        {alertValue && <AlertModal modalType="alert" onClose={() => setAlertValue(false)} />}
      </div>
      <div>
        <button onClick={columnToggle}>CreateColumn</button>
        {columnValue && (
          <CreateColumn onClose={() => setColumnValue(false)} callback={() => console.log("칼럼을 생성")} />
        )}
      </div>
      <div>
        <button onClick={columnUpdateToggle}>UpdateColumn</button>
        {columnUpdateValue && (
          <UpdateColumn
            onClose={() => setColumnUpdateValue(false)}
            callback={() => {
              console.log("칼럼을 변경");
            }}
            onDelete={deleteToggle}
          />
        )}
        {deleteValue && (
          <AlertModal
            modalType="delete"
            onClose={() => {
              setDeleteValue(false);
            }}
            callback={() => {
              console.log("칼럼이 삭제되었습니다.");
              setColumnUpdateValue(false);
            }}
          />
        )}
      </div>
      <div>
        <button onClick={todoToggle}>CreateToDo</button>
        {todoValue && <CreateTodo onClose={() => setTodoValue(false)} callback={() => console.log("할일을 생성")} />}
      </div>
      <div>
        <button onClick={todoUpdateToggle}>UpdateTodo</button>
        {todoUpdateValue && (
          <UpdateTodo onClose={() => setTodoUpdateValue(false)} callback={() => console.log("할일을 변경")} />
        )}
      </div>
      <div>
        <button onClick={taskToggle}>TaskModal</button>
        {taskValue && <TaskModal onClose={() => setTaskValue(false)} callback={() => console.log("할일을 변경")} />}
      </div>
      <div>
        <button onClick={inviteToggle}>InviteModal</button>
        {inviteValue && (
          <InviteModal onClose={() => setInviteValue(false)} callback={() => console.log("구성원을 초대")} />
        )}
      </div>
    </>
  );
}
