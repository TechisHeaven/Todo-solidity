import { Button, Dialog, Flex, Text, TextArea } from "@radix-ui/themes";
import { useState } from "react";

import { FiEdit2 } from "react-icons/fi";
import { useDispatchContext, useStateContext } from "../../../state";

const EditTodoDialog = ({ value, index }: { value: any; index: number }) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const contract = state?.TodoContract?.contract;
  const EditTodo = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      await contract.methods
        .editTodo(description, index)
        .send({ from: state?.user.user });

      // dispatch?.({ type: "FETCH_TODO_REQUEST" });
      // dispatch?.({ type: "RESET_TODO" });
      const result = await contract.methods.getTodo().call();
      const todosWithIndex = result.map((todo, index) => ({
        ...todo,
        index: index + 0,
      }));

      dispatch?.({
        type: "EDIT_TODO",
        payload: { index: index, data: todosWithIndex[index] },
      });

      console.log(state.todo.todo);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
  // console.log(index);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <h1 className=" flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 transition-colors rounded-sm">
          <span>
            <FiEdit2 />
          </span>
          <span>Edit</span>
        </h1>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit To-Do</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Edit To-Do of your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={value.description}
              placeholder="Enter your description"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => EditTodo()}>Create</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditTodoDialog;
