import React from "react";
import {
  Box,
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const FrequestQuestions: React.FC = () => {
  return (
    <Box maxW="6xl" mx="auto" mt={8} p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Frequently Asked Questions
      </Heading>
      <VStack spacing={4} align="stretch">
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What types of connectors are available at your charging
                  stations?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Our charging stations offer a variety of connectors including Type
              1 (SAE J1772), Type 2 (Mennekes), CHAdeMO, and CCS Combo. These
              connectors cover a wide range of EV models to ensure
              compatibility.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How long does it take to charge an electric vehicle?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              The charging time depends on the type of charger and the capacity
              of the vehicle's battery. Fast chargers can charge a vehicle up to
              80% in 30-60 minutes, while standard chargers may take several
              hours.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What payment methods do you accept at the charging stations?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              We accept a variety of payment methods including credit/debit
              cards, mobile payment apps, and membership cards. Please check the
              specific station details for available payment options.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Do I need a membership to use the charging stations?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              While a membership offers benefits such as discounted rates and
              easier access, it is not required to use our charging stations.
              Non-members can pay per use.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Are your charging stations available 24/7?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Yes, our charging stations are available 24/7. However, it is
              always a good idea to check the specific location details for any
              maintenance schedules or temporary closures.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I locate a charging station near me?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can locate a nearby charging station using our mobile app or
              website. Simply enter your location, and the app will show all
              available stations in your vicinity.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default FrequestQuestions;
