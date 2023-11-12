import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import { useDispatchContext, useStateContext } from "../../../state";
import TodoInterface from "../../../types/TodoType";

const HandleTodo = ({
  user,
  TodoContract,
}: {
  user: string;
  TodoContract: any;
}) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatchContext();
  const state = useStateContext();

  const addTodo = async () => {
    try {
      const result = await TodoContract.methods
        .addTodo(description)
        .send({ from: user });
      if (result) {
        const result = await TodoContract.methods.getTodo().call();

        if (result.length > 0) {
          const lastTodo: TodoInterface | undefined = {
            ...result[result.length - 1],
            index: state?.todo.todo.length || 0,
          };
          dispatch({ type: "ADD_TODO", payload: lastTodo });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="hover:bg-[#3035d2] transition-colors cursor-pointer">
          <PlusIcon />
          Create Task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create To-Do</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create To-Do to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
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
            <Button onClick={addTodo}>Create</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default HandleTodo;
