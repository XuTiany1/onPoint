import useForm from "./UseForm";
import { useRef } from "react";

// Specifying the correct form endpoint
const FORM_ENDPOINT = "http://localhost:1000/testDB/postvideo"; 

const Form = () => {
  const formElement = useRef(null);
  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useForm({
    additionalData,
  });

  if (status === "success") {
    return (
      <>
        <div>Thank you!</div>
        <div>{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form 
    action={FORM_ENDPOINT}
    onSubmit={handleSubmit}
    method="POST">

        <div className="flex flex-col md:flex-row justify-center mb-4">
            <input
                placeholder="Your video link..."
                type="url"
                name="member[email]"
                id="member_email"
                className="text-2xl placeholder:text-gray-400 placeholder:italic py-4 px-6 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 focus:bg-opacity-20 duration-150 md:rounded-tr-none md:rounded-br-none rounded-full outline-none mb-4 md:mb-0"
            />
            <input
                type="submit"
                value="SUBMIT!"
                name=""
                id=""
                className=" bg-blue-300 md:rounded-tl-none md:rounded-bl-none rounded-full text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 font-bold uppercase cursor-pointer hover:opacity-75 duration-150"
            />
        </div>

        <div className="opacity-75 italic">
            After entering your video link, the summary will be generated down below!
        </div>

    </form>











    // <form
    //   action={FORM_ENDPOINT}
    //   onSubmit={handleSubmit}
    //   method="POST"
    // >
    //   <div className="mb-3 pt-0">
    //     <input
    //       type="text"
    //       placeholder="Your name"
    //       name="name"
    //       required
    //     />
    //   </div>
    //   <div className="mb-3 pt-0">
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       name="email"
    //       required
    //     />
    //   </div>
    //   <div className="mb-3 pt-0">
    //     <textarea
    //       placeholder="Your message"
    //       name="message"
    //       required
    //     />
    //   </div>
    //   {status !== "loading" && (
    //     <div className="mb-3 pt-0">
    //       <button type="submit">
    //         Send a message
    //       </button>
    //     </div>
    //   )}
    // </form>
  );
};

export default Form;