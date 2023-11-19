import { CalendarIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import PopOver from "./PopOver";
import { TodoInterface } from "../../../types/TodoType";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatchContext, useStateContext } from "../../../state";

const TableSection = ({ todo }: { todo: TodoInterface[] | null }) => {
  //handle date and return is today or not
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const todoContract = state?.TodoContract.contract;
  const handleDate = (timestamp: number) => {
    const dateTime = new Date(timestamp * 1000);
    const isToday =
      dateTime.toLocaleDateString() === new Date().toLocaleDateString();
    const isYesterday =
      new Date(
        dateTime.getTime() - 24 * 60 * 60 * 1000
      ).toLocaleDateString() === dateTime.toLocaleDateString();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const formattedDate = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
  };

  const handleCheckBox = async (value: TodoInterface) => {
    try {
      await todoContract?.methods.completeTodo(value.index).send();

      dispatch?.({ type: "COMPLETE_TODO", payload: value.index });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col-reverse gap-4">
      <AnimatePresence>
        {todo && todo.length > 0 ? (
          todo.map((value, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`shadow-sm border cursor-pointer p-4 rounded-md hover:shadow-md flex transition-shadow  justify-between items-center ${
                  value.isCompleted && "bg-[#3e43d5]/5"
                }`}
                key={index}
              >
                <Text as="label" size="2">
                  <Flex gap="2" direction={"row"} className=" accent-[#3e43d5]">
                    <input
                      onChange={() => handleCheckBox(value)}
                      type="checkbox"
                      className="w-4"
                      disabled={value.isCompleted}
                      defaultChecked={value.isCompleted}
                    />
                    <Flex direction={"column"}>
                      <h1
                        className={`text-base font-medium capitalize ${
                          value.isCompleted &&
                          "line-through text-gray-500 select-none"
                        }`}
                      >
                        {value.description}
                      </h1>
                      {!value.isCompleted && (
                        <span className="text-orange-500 flex items-center gap-2 text-sm">
                          <CalendarIcon />

                          <p>{handleDate(Number(value.timestamp))}</p>
                        </span>
                      )}
                    </Flex>
                  </Flex>
                </Text>
                <PopOver index={index} value={value} />
              </motion.div>
            );
          })
        ) : (
          <>
            <h1 className="grid place-items-center font-medium">
              Create a Todo 😊
            </h1>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableSection;
