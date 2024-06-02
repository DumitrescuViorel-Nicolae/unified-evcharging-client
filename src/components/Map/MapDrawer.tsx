import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import MapGL from "./Map";

interface MapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapDrawer: React.FC<MapDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size={"full"}
      closeOnEsc
    >
      <DrawerOverlay />
      <DrawerContent bg={"complementary.300"}>
        <DrawerCloseButton color={"primary.600"} />
        <DrawerBody>
          <MapGL />
        </DrawerBody>
        <DrawerFooter>
          <Button m={"0 auto"} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
