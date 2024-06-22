import { useMemo, useState } from "react";
import {
  Text,
  Select,
  Input,
  Button,
  Collapse,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FilterValues } from "../../interfaces/FilterValues";
import createSelectors from "../../store/createSelectors";
import evStationStore from "../../store/EVStationStore/evStationStore";

interface FilterProps {
  // onApplyFilters: (filters: FilterValues) => void;
}

const Filter: React.FC<FilterProps> = () => {
  const [filters, setFilters] = useState<FilterValues | null>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const useEVStationStore = createSelectors(evStationStore);
  const getTypes = useEVStationStore.use.getConnectorTypes();
  const clearFiltersInStore = useEVStationStore.use.clearFilters();
  const filterEvStations = useEVStationStore.use.filterEVStations();

  const types = useEVStationStore.use.connectorTypes();
  const brands = useEVStationStore.use.brands();

  // LOCAL STATE
  useMemo(() => {
    getTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log("filters in filter", filters);
    setFilters(filters);
    filterEvStations(filters);
  };

  const clearFilters = () => {
    setFilters({});
    clearFiltersInStore();
  };

  const handleShowNearMe = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      distance: undefined,
      showNearMe: true,
    }));
    filterEvStations(filters);
  };

  return (
    <Flex
      mt={2.5}
      direction="column"
      bg="complementary.300"
      color="primary.600"
    >
      <Button
        variant="solid"
        bg={"accent.100"}
        onClick={() => setIsExpanded(!isExpanded)}
        mb={4}
        p={3}
        _focus={{ outline: "none" }}
        _hover={{
          textDecoration: "underline",
          color: "primary.700",
          transition: "color 0.2s, text-decoration 0.2s",
        }}
      >
        <Text fontSize="lg" transition="color 0.2s">
          Filter
        </Text>
      </Button>
      <Collapse in={isExpanded} animateOpacity>
        <Flex p={4} borderRadius="md" overflowX="auto">
          <Flex flexGrow={3} direction="row">
            <Select
              placeholder="Select connector type"
              name="connectorType"
              onChange={handleChange}
              w={"20rem"}
              color={"complementary.300"}
              bg={"primary.600"}
              value={filters?.connectorType || ""}
            >
              {types.map((type) => (
                <option value={type.description}>{type.description}</option>
              ))}
            </Select>

            <Select
              placeholder="Select a brand"
              name="brand"
              onChange={handleChange}
              ml={1}
              w={"20rem"}
              color={"complementary.300"}
              bg={"primary.600"}
              value={filters?.brand || ""}
            >
              {brands.map((brand) => (
                <option value={brand.description}>{brand.description}</option>
              ))}
            </Select>
            <Input
              type="number"
              name="distance"
              placeholder="Remaining Range"
              w={"20rem"}
              onChange={handleChange}
              ml={1}
              color={"complementary.300"}
              bg={"primary.600"}
              value={filters?.distance || ""}
            />
          </Flex>
          <Button
            variant="solid"
            onClick={handleShowNearMe}
            bg="accent.100"
            ml={2}
          >
            Show Near Me
          </Button>
          <Box ml={6}>
            <Button w={"5rem"} onClick={handleApplyFilters} bg="accent.100">
              Apply
            </Button>
            <Button w={"5rem"} onClick={clearFilters} bg="accent.100" ml={2}>
              Clear
            </Button>
          </Box>
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default Filter;
