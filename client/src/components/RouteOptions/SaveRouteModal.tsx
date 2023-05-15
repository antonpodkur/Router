import { LatLngExpression } from "leaflet";
import { LngLat } from "../../services/LocationService";
import { Button, Divider, FormControl, FormLabel, Icon, Input, XIcon, cx } from "@vechaiui/react";
import { Save, XCircle } from "react-feather";
import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface SaveRouteModalProps {
  coords: Array<LatLngExpression>;
  points: Array<LngLat>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveRouteModal: React.FC<SaveRouteModalProps> = ({
  coords,
  points,
  show,
  setShow,
}) => {
    
    const inputRef = useRef(null)

    const handleClose = () => setShow(false)
    
  return (
    <Transition show={show} as={React.Fragment}>
      <Dialog
        initialFocus={inputRef}
        as="div"
        className="fixed inset-0 overflow-y-auto z-modal"
        open={show}
        onClose={handleClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
              "bg-white border border-gray-200",
              "dark:bg-neutral-800 dark:border-neutral-700",
              "max-w-md px-2"
            )}
          >
            <header className="relative px-3 pt-3 pb-2 text-lg font-semibold">
                Save your route
            </header>
            <button
              onClick={handleClose}
              className="absolute text-sm text-gray-600 cursor-base dark:text-gray-400 hover:text-primary-500 top-4 right-4"
            >
              <XIcon className="w-4 h-4" label={""} />
            </button>
            <Divider
              orientation="horizontal"
              className="border-neutral-200 dark:border-neutral-700"
            />
            <div className="flex-1 px-3 py-2">
              <FormControl id="name">
                <FormLabel>Route name:</FormLabel>
                <Input ref={inputRef} color="red" />
              </FormControl>
            </div>
            <Divider
              orientation="horizontal"
              className="border-neutral-200 dark:border-neutral-700"
            />
            <footer className="flex justify-center px-3 py-2 space-x-4">
              <Button
                color="primary" 
                leftIcon={<Icon as={XCircle} label="cancel" className="w-4 h-4 mr-1"/>}
                className="mr-2"
                onClick={handleClose}
            >
                Close
            </Button>
              <Button
                variant="solid"
                color="primary" 
                leftIcon={<Icon as={Save} label="save" className="w-4 h-4 mr-1"/>}
                className="mr-2"
                onClick={handleClose}
            >
                Save
            </Button>
            </footer>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SaveRouteModal;