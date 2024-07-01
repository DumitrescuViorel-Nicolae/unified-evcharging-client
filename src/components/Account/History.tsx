import { useEffect, useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";

const History = () => {
  const useEvStationsStore = createSelectors(evStationStore);
  const getTransactions = useEvStationsStore.use.getTransactions();
  const transactions = useEvStationsStore.use.transactions();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransactionUrl, setSelectedTransactionUrl] = useState("");

  const handleTransactionUrlClick = (url: string) => {
    setSelectedTransactionUrl(url);
    onOpen();
  };

  const truncateUrl = (url: string) => {
    const maxLength = 25;
    return url.length > maxLength ? url.substr(0, maxLength - 3) + "..." : url;
  };

  return (
    <TableContainer mt={10}>
      <Table variant="striped" colorScheme="green">
        <Thead>
          <Tr>
            <Th>Transaction ID</Th>
            <Th>Amount</Th>
            <Th>Currency</Th>
            <Th>Payment Method</Th>
            <Th>Last 4 Digits</Th>
            <Th>Status</Th>
            <Th>Receipt URL</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.transactionId}>
              <Td>{transaction.transactionId}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.currency}</Td>
              <Td>{transaction.paymentMethodBrand}</Td>
              <Td>{transaction.paymentMethodLast4}</Td>
              <Td>{transaction.status}</Td>
              <Td>
                <Link color="green" href={transaction.receiptUrl}>
                  {truncateUrl(transaction.receiptUrl)}
                </Link>
              </Td>
              <Td>{transaction.createdAt?.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Receipt</ModalHeader>
          <ModalBody>
            <iframe
              src={selectedTransactionUrl}
              title="Transaction Receipt"
              width="100%"
              height="500px"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};

export default History;
