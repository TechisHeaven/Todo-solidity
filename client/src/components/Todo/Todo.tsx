import { Badge, Flex, Heading } from "@radix-ui/themes";
import TableSection from "./Table/Table";
import HandleTodo from "./HandleTodo/HandleTodo";
import Web3 from "web3";
import TodoAbi from "../../../contracts/Todo.sol/Todo.json";
import { useEffect } from "react";
import { TodoInterface, Action } from "../../types/TodoType";
import { useDispatchContext, useStateContext } from "../../state";

const Todo = ({ user }: { user: string }) => {
  const state = useStateContext();
  const dispatch: React.Dispatch<Action> | undefined = useDispatchContext();
  // const TodoAddress = "0x67a895D6e965293e16Cbb7A57399351C095A883c";
  const TodoAddress = "0x3fF2B95FF4dF04C30Ff5Ba45e72E7c0b0e5b7FF1";

  const web3 = new Web3(window.ethereum);

  const TodoContract = new web3.eth.Contract(TodoAbi.abi, TodoAddress, {
    from: user,
  });

  async function getTodo() {
    dispatch?.({ type: "FETCH_TODO_REQUEST" });
    try {
      const result: TodoInterface[] = await TodoContract.methods
        .getTodo()
        .call();

      const todosWithIndex = result.map((todo, index) => ({
        ...todo,
        index: index + (state?.todo.todo.length ?? 0),
      }));
      dispatch?.({ type: "FETCH_TODO_SUCCESS", payload: todosWithIndex });
    } catch (error) {
      dispatch?.({ type: "FETCH_TODO_FAILURE", payload: error });
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch?.({ type: "FETCH_CONTRACT_SUCCESS", payload: TodoContract });
    getTodo();
  }, []);

  return (
    <div className="max-w-[1000px] m-auto p-20 flex flex-col gap-4">
      <Flex gap="4">
        <Badge className="w-full flex flex-wrap" color="blue">
          <p> Account Connected : </p>
          <span className="overflow-auto">{state?.user.user}</span>
        </Badge>
      </Flex>
      <Heading>To-Do</Heading>
      <hr />
      <div>
        <HandleTodo TodoContract={TodoContract} user={state?.user.user} />
      </div>
      {state?.todo.loading ? (
        "Loading..."
      ) : (
        <TableSection todo={state?.todo.todo || null} />
      )}
    </div>
  );
};

export default Todo;
