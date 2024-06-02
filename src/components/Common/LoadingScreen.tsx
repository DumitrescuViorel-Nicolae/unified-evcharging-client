import { Spinner, Center, VStack } from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import appStateStore from "../../store/CommonStore/appStateStore";

const LoadingScreen = () => {
  const useAppStateStore = createSelectors(appStateStore);
  const isLoading = useAppStateStore.use.isLoading();

  return (
    <>
      {isLoading ? (
        <Center
          h="200vh"
          w="100vw"
          zIndex="9999"
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          opacity={"75%"}
          bg={"primary.600"}
        >
          <VStack spacing={4} className="align-middle">
            <Spinner size="xl" color="complementary.300" />
            <div>Loading...</div>
          </VStack>
        </Center>
      ) : null}
    </>
  );
};

export default LoadingScreen;
