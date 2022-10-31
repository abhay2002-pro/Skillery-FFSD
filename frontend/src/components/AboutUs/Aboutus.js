import React from 'react';
import { Image } from '@chakra-ui/image';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Stack, HStack, Flex, Box, Text, Heading } from '@chakra-ui/layout';
import './About.css';
import a1 from '../../assests/images/avataricons/1co-f.svg'
import a2 from '../../assests/images/avataricons/2co-f.svg'
import a3 from '../../assests/images/avataricons/3co-f.svg'
import a4 from '../../assests/images/avataricons/4co-f.svg'
import a5 from '../../assests/images/avataricons/5co-f.svg'
import aboutUsImg from '../../assests/images/aboutus.jpg'
import { Link } from 'react-router-dom';


function Aboutus() {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');

  return (
    <Stack>
      <HStack>
        <Flex
          direction={isNotSmallerScreen ? 'row' : 'column'}
          spacing="200px"
          p={isNotSmallerScreen ? '32' : '0'}
          alignSelf="flex-start"
        >
          <div className="imageabout">
            <Image
              paddingTop={30}
              src={aboutUsImg}
            />{' '}
          </div>
          <div>
            <Box mt={isNotSmallerScreen ? '0' : 16} align="flex-start">
              <Text className="text">Welcome, </Text>
              <Text
                className="font"
                fontWeight="bold"
                fontSize={30}
                paddingBottom={10}
              >
                We’re Skillery, and this is our Story :){' '}
              </Text>
              <Text fontSize="17px" fontWeight="">
                Skillery was a dream which was envisioned 4 months back to make
                programming education easy and accessible for Indian students.
                We provide premium content at a very reasonable subscription cost.{' '}
              </Text>
              <Link to="/subscribe">
                <Heading color="yellow.400" fontSize="xl">
                  Checkout the plan
                </Heading>
              </Link>
            </Box>
          </div>
        </Flex>
      </HStack>
      <HStack>
        <div>
          <Flex
            rounded="l"
            direction="column"
            mt={4}
            ml={isNotSmallerScreen ? 4 : 0}
            bg="gray.100"
            h="33vh"
            w="33vh"
            justify="flex-end"
            _hover={{ bg: 'teal.400' }}
            marginLeft={20}
          >
            <Image src= {a5} />
            <Text color="black" p="4" fontSize="l" fontWeight="semibold">
              Abhay Ray
            </Text>
          </Flex>
        </div>
        <div>
          <Flex
            rounded="l"
            direction="column"
            mt={4}
            ml={isNotSmallerScreen ? 4 : 0}
            bg="gray.100"
            h="33vh"
            w="33vh"
            justify="flex-end"
            _hover={{ bg: 'teal.400' }}
            marginLeft={10}
          >
            <Image src= {a1} />
            <Text color="black" p="4" fontSize="l" fontWeight="semibold">
              Shubham Chandwani
            </Text>
          </Flex>
        </div>
        <div>
          <Flex
            rounded="l"
            direction="column"
            mt={4}
            ml={isNotSmallerScreen ? 4 : 0}
            bg="gray.100"
            h="33vh"
            w="33vh"
            justify="flex-end"
            _hover={{ bg: 'teal.400' }}
            marginLeft={10}
          >
            <Image src={a2} />
            <Text color="black" p="4" fontSize="l" fontWeight="semibold">
              Tanmay Pawar
            </Text>
          </Flex>
        </div>
        <div>
          <Flex
            rounded="l"
            direction="column"
            mt={4}
            ml={isNotSmallerScreen ? 4 : 0}
            bg="gray.100"
            h="33vh"
            w="33vh"
            justify="flex-end"
            _hover={{ bg: 'teal.400' }}
            marginLeft={10}
          >
            <Image src={a4} />
            <Text color="black" p="4" fontSize="l" fontWeight="semibold">
              Ashutosh Rawat
            </Text>
          </Flex>
        </div>
        <div>
          <Flex
            rounded="l"
            direction="column"
            mt={4}
            ml={isNotSmallerScreen ? 4 : 0}
            bg="gray.100"
            h="33vh"
            w="33vh"
            justify="flex-end"
            _hover={{ bg: 'teal.400' }}
            marginLeft={10}
          >
            <Image src={a3} />
            <Text color="black" p="4" fontSize="l" fontWeight="semibold">
              Tanmay Umredkar
            </Text>
          </Flex>
        </div>
      </HStack>

      <br />
    </Stack>
  );
}

export default Aboutus;
