import { useEffect, useState } from "react";
import useLanguage from "../../../../hooks/useLanguage";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import io, { Socket } from "socket.io-client";

const TakePhoto = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  const { handleLanguageChoice } = useLanguage();

  const { CreateIdentity } = useAuth();

  const [verifyUrl, setVerifyUrl] = useState("");

  // console.log(verifyUrl);

  const token = sessionStorage.getItem("userToken");

  // console.log(token);

  useEffect(() => {
    let socket: Socket;

    if (token) {
      // console.log("ln42", token);
      socket = io(`${process.env.REACT_APP_SOCKET_TEST_URL}`, {
        extraHeaders: {
          token,
        },
      });

      socket.on("connect", () => {
        toast.remove();
        toast.success("Connection successful..");
      });

      socket.on("STRIPE_IDENTITY", (data) => {
        // console.log("Received stripe_identity event:", data);
        toast.remove();
        toast.success("Verification successful...");
        setTimeout(() => {
          handleNext();
        }, 800);
      });

      socket.on("disconnect", () => {
        toast.remove();
        toast.success("Disconnected..");
        // console.log("Disconnected from Socket.IO server");
      });

      socket.on("error", (error) => {
        console.error("Socket.IO error:", error);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [verifyUrl, token]);

  const handleIdentity = async () => {
    toast.remove();
    toast.loading("Fetching...");
    try {
      const data = await CreateIdentity();
      toast.remove();
      toast.success(data?.message);
      setVerifyUrl(data?.data?.url);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleIdentity();
  }, []);

  return (
    <div className="w-full mt-[80px]">
      <h1 className=" text-center mb-5 text-xl font-medium">
        {/* {handleLanguageChoice("take_photo")} */}
        Verify your Identity
      </h1>
      <div className="flex items-center justify-center p-5">
        <iframe
          title="User verification"
          src={verifyUrl}
          className="w-[100%] min-h-[600px] border border-gray-200"
        />
      </div>
    </div>
  );
};

export default TakePhoto;
