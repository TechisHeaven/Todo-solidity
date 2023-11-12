import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, Popover } from "@radix-ui/themes";
import EditTodoDialog from "../HandleTodo/EditTodoDialog";
import DeleteTodoDialog from "../HandleTodo/DeleteTodoDialog";

const PopOver = ({ value, index }: { value: any; index: number }) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant="soft"
          className="mr-2 h-full aspect-square cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
        >
          <DotsVerticalIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 120, padding: 0 }}>
        {!value.isCompleted && <EditTodoDialog index={index} value={value} />}
        <DeleteTodoDialog index={index} value={value} />
      </Popover.Content>
    </Popover.Root>
  );
};

export default PopOver;
