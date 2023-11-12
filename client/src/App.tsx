import { Button, Heading } from "@radix-ui/themes";
import { useEffect } from "react";
import { GrConnect } from "react-icons/gr";
import Web3 from "web3";
import Todo from "./components/Todo/Todo";
import "@radix-ui/themes/styles.css";
import { useDispatchContext, useStateContext } from "./state";
import ToastDemo from "./components/utils/CustomToast/CustomToast";
import { Action } from "./types/TodoType";

function App() {
  const state = useStateContext();
  const dispatch: React.Dispatch<Action> | undefined = useDispatchContext();
  //connect to metamask
  const ethereum = window.ethereum;
  const web3 = new Web3(ethereum);

  function handleConnect() {
    if (typeof ethereum === "undefined") {
      return alert("Metamask is not installed");
    }
    dispatch?.({ type: "LOGIN_REQUEST" });

    web3.eth.requestAccounts().then((accounts: Array<string>) => {
      if (accounts.length > 1) {
        alert("Please only connect one account");
        return;
      }
      // setUser(accounts[0]);
      localStorage.setItem("user", accounts[0]);
      dispatch?.({ type: "LOGIN_SUCCESS", payload: accounts[0] });
    });
  }

  useEffect(() => {
    ethereum.on("accountsChanged", async () => {
      dispatch?.({ type: "LOGIN_REQUEST" });
      if (ethereum.selectedAddress !== state?.user.user) {
        return alert("Please switch to the account you connected with");
      }

      const newAccounts = await web3.eth.getAccounts();
      dispatch?.({ type: "LOGIN_SUCCESS", payload: newAccounts[0] });
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch?.({ type: "LOGIN_REQUEST" });
      web3.eth.requestAccounts().then((accounts: Array<string>) => {
        dispatch?.({
          type: "LOGIN_SUCCESS",
          payload: accounts[0],
        });
      });
    }
  }, []);

  return (
    <>
      {!state?.user.loading && state?.user.user ? (
        <>
          <Todo user={state?.user.user} />
          <ToastDemo
            type={"warning"}
            heading={"test heading"}
            description={"test description"}
          >
            <button>hello button</button>
          </ToastDemo>
          <button>test button toast</button>
        </>
      ) : (
        <div className="grid place-items-center h-screen bg-gradient-to-b from-purple-600 to-yellow-400">
          <div className="flex flex-col items-center gap-4 text-white">
            <Heading as="h1" className="text-4xl">
              Connect to Continue
            </Heading>
            <Button className="cursor-pointer" onClick={handleConnect}>
              <GrConnect
                style={{
                  color: "white",
                }}
              />
              Connect
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
