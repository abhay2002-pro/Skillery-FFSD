import React from 'react';
import { Image } from '@chakra-ui/image';
import { useMediaQuery } from '@chakra-ui/media-query';
import {
  Stack,
  HStack,
  Flex,
  Box,
  Text,
  Heading,
  Container,
} from '@chakra-ui/layout';
import './About.css';
import a1 from '../../assests/images/avataricons/1co-f.svg';
import a2 from '../../assests/images/avataricons/2co-f.svg';
import a3 from '../../assests/images/avataricons/3co-f.svg';
import a4 from '../../assests/images/avataricons/4co-f.svg';
import a5 from '../../assests/images/avataricons/5co-f.svg';
import aboutUsImg from '../../assests/images/aboutus.jpg';
import { Link } from 'react-router-dom';

function Aboutus() {
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');

  return (
    <Stack>
      <HStack>
        <Flex
          direction={['column','row']}
          spacing="200px"
          p={[10, 20]}
          alignSelf="flex-start"
        >
          <div className="imageabout">
            <Image paddingTop={30} src={aboutUsImg} />{' '}
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
                We provide premium content at a very reasonable subscription
                cost.{' '}
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
      <Stack direction={['column', 'row']} alignContent="center">
        <Container>
          <Image src={a5} />
          <Text _hover={{ bg: 'yellow.400' }} color="black" p="4" fontSize="l" fontWeight="semibold" textAlign={'center'}>
            Abhay Kumar Ray
          </Text>
        </Container>
        <Container>
          <Image src={a4} />
          <Text _hover={{ bg: 'yellow.400' }} color="black" p="4" fontSize="l" fontWeight="semibold" textAlign={'center'}>
            Tanmay Umredkar
          </Text>
        </Container>
        <Container>
          <Image src={a3} />
          <Text _hover={{ bg: 'yellow.400' }} color="black" p="4" fontSize="l" fontWeight="semibold" textAlign={'center'}>
            Tanmay Pawar
          </Text>
        </Container>
        <Container>
          <Image src={a2} />
          <Text _hover={{ bg: 'yellow.400' }} color="black" p="4" fontSize="l" fontWeight="semibold" textAlign={'center'}>
            Shubham Chandwani
          </Text>
        </Container>
        <Container>
          <Image src={a1} />
          <Text _hover={{ bg: 'yellow.400' }} color="black" p="4" fontSize="l" fontWeight="semibold" textAlign={'center'}>
            Ashutosh Rawat
          </Text>
        </Container>
      </Stack>
    </Stack>
  );
}

export default Aboutus;
