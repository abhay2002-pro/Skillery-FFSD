import { Button } from '@chakra-ui/button';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { HStack, VStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
function Header() {
  const isAuthenticated = false;
  const user = {
    role: "admin"
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height="12"
        rounded="full"
        position="fixed"
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(2px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" display="flex" alignContent="center"> <Image src="/logoSkillery.svg" boxSize="30" objectFit={'contain'} display="inline" mr={1} />SKILLERY</DrawerHeader>
          <DrawerBody>
            <VStack spacing="5" alignItems="flex-start">
              <Link to="/" onClick={onClose}>
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/courses" onClick={onClose}>
                <Button variant="ghost">Browse All Courses</Button>
              </Link>
              <Link to="/request" onClick={onClose}>
                <Button variant="ghost">Request a course</Button>
              </Link>
              <Link to="/contact" onClick={onClose}>
                <Button variant="ghost">Contact Us</Button>
              </Link>
              <Link to="/about" onClick={onClose}>
                <Button variant="ghost">About</Button>
              </Link>

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom="2rem"
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile" onClick={onClose}>
                          <Button variant="ghost" colorScheme="yellow">
                            Profile
                          </Button>
                        </Link>
                        <Link to="/" onClick={onClose}>
                        <Button variant="ghost">
                          <RiLogoutBoxLine style={{margin : "4px"}} />
                          Logout
                        </Button>
                        </Link>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button colorScheme={"purple"} variant="ghost">
                            <RiDashboardFill style={{margin : "4px"}} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button colorScheme="yellow" onClick={onClose}>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link to="/register">
                      <Button colorScheme="yellow" onClick={onClose}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
