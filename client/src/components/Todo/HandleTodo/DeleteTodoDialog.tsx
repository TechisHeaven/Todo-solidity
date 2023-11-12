import { AlertDialog, Button, Flex } from "@radix-ui/themes";

import { AiOutlineDelete } from "react-icons/ai";
import { useDispatchContext, useStateContext } from "../../../state";

const DeleteTodoDialog = ({
  value,
  index,
}: {
  value: object;
  index: number;
}) => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const contract = state?.TodoContract.contract;
  const DeleteTodo = async () => {
    try {
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // const currentAccount = accounts[0];

      // Use send instead of call for transactions
      await contract?.methods
        .removeTodo(index)
        .send({ from: state?.user.user });
      dispatch({ type: "REMOVE_TODO", payload: index });
    } catch (error) {
      console.log(error);
    }
    // let result = await contract?.methods
    //   .removeTodo(index)
    //   .call({ from: state?.user.user });
    // console.log(result);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <h1 className="text-red-500 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 transition-colors rounded-sm">
          <span>
            <AiOutlineDelete />
          </span>
          <span>Delete</span>
        </h1>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Todo</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This Todo will no longer be accessible and any existing
          sessions will be expired.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={DeleteTodo} variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteTodoDialog;
