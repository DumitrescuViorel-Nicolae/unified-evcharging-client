import { Spinner, Center, VStack } from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import appStateStore from "../../store/CommonStore/appStateStore";

const LoadingScreen = () => {
  const useAppStateStore = createSelectors(appStateStore);
  const isLoading = useAppStateStore.use.isLoading();

  return (
    <>
      {isLoading ? (
        <Center h="100vh" zIndex="9999">
          <VStack spacing={4}>
            <Spinner size="xl" color="complementary.300" />
            <div>Loading...</div>
          </VStack>
        </Center>
      ) : null}
    </>
  );
};

export default LoadingScreen;
