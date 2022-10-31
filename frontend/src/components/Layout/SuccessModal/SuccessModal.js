import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function SuccessModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {' '}
          <Flex alignItems="center" gap="1">
            <AiFillCheckCircle color="green" />
            Success
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.successText}</ModalBody>

        <ModalFooter>
          <Link to={props.buttonLink}>
            <Button colorScheme={props.colorTheme} mr={3}>
              {props.buttonText}
            </Button>
          </Link>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;
