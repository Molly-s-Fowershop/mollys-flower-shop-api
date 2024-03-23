import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
  Img,
  TailwindConfig,
  Section,
  Button,
} from '@react-email/components';

type WelcomeProps = {
  name: string;
};

const tailwindConfig: TailwindConfig = {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
};

export default function Welcome({ name = 'Manuel' }: WelcomeProps) {
  return (
    <Tailwind config={tailwindConfig}>
      <React.Fragment>
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
          </Head>

          <Body className="text-black text-justify py-6 font-sans">
            <Container className="shadow-md">
              <Container className="bg-[#FFEFFF] p-6">
                <Container className="mx-auto w-fit">
                  <Img
                    alt="Molly's Flower Shop Logo"
                    className="w-48 mx-auto text-center"
                    src="https://nestjs-s3-example.s3.amazonaws.com/mollys-flower-shop-logo.png"
                  />
                  <Text className="text-2xl m-0 mt-2 font-semibold text-center">
                    Welcome to our store!
                  </Text>
                </Container>
              </Container>

              <Section className="p-6">
                <Container>
                  <Heading className="text-xl font-medium m-0">
                    Hi, {name}!
                  </Heading>

                  <Text className="m-0 mt-2">
                    We're excited to have you here. Thank you for considering
                    us!
                  </Text>

                  <Text className="m-0 mt-2">
                    Take a moment to browse through our collection and discover
                    the perfect floral gift for any occasion.
                  </Text>
                </Container>

                <Container className="text-center mt-4 p-0.5">
                  <Container className=" bg-black w-fit mx-auto p-0.5 rounded-md">
                    <Button
                      href="#"
                      className="text-black w-fit px-2 py-1.5 mx-auto bg-white text-sm rounded-md"
                    >
                      Visit Our Store
                    </Button>
                  </Container>
                </Container>
              </Section>

              <Container className="bg-[#FFEFFF] p-6">
                <Text className="m-0">
                  If you have any questions, feel free to reach out to us at any
                  time.
                </Text>
              </Container>
            </Container>
          </Body>
        </Html>
      </React.Fragment>
    </Tailwind>
  );
}
