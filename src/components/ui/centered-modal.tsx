import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CenteredModal({
  title,
  children,
  open,
  setOpen,
  closeButtonLabel,
  width,
}: {
  title?: string;
  children: any;
  open: any;
  setOpen: any;
  closeButtonLabel?: any;
  width?: any;
}) {
  const cancelButtonRef = useRef(null);

  //console.log({ title, children, open, setOpen, closeButtonLabel })
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`${
                width ? width : "sm:w-6/12"
              } relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-8/12 sm:my-8 sm:align-middle sm:max-w-9/12`}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                    <Dialog.Title
                      as="h3"
                      className="text-md flex items-center justify-between leading-6 font-medium text-customBlue text-left"
                    >
                      {title}
                      {/* <button
                        type="button"
                        ref={cancelButtonRef}
                        onClick={() => setOpen(false)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button> */}
                    </Dialog.Title>
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
