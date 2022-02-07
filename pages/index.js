import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchData } from '../utils/fetchApi';

import Property from '../components/Property';

const Banner = ({purpose, title1, title2, desc1, buttonText, linkName, desc2, imgUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imgUrl} alt="" width={500} height={300} />
    <Box p="5" >
      <Text color="gray.500" fontSize="sm" fontWeight="medium"> { purpose } </Text>
      <Text fontSize="3xl" fontWeight="bold"> { title1 } <br /> { title2 } </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700"> { desc1 } <br /> { desc2 } </Text>
      <Button fontSize="xl">
        <Link href={linkName}> 
          <a> { buttonText }</a>
        </Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertyForSale, propertyForRent}) {
  return (
    <Box>
      <Banner 
        purpose="RENT A HOME" 
        title1="Rental Homes for" 
        title2="Everyone" 
        desc1="Explore Apartments. Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertyForRent?.map(property=> (
          <Property key={property.id} data={property}/>
        ))}
      </Flex>
      <Banner 
        purpose="BUY A HOME" 
        title1="Find, Buy & Own Your" 
        title2="Dream Home" 
        desc1="Explore Apartments. Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
          {propertyForSale?.map(property=> (
            <Property key={property.id} data={property} />
          ))}
      </Flex>
    </Box>
  )
}


export async function getStaticProps(){
  const propertyForSale = await fetchData(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPages=6`)
  const propertyForRent = await fetchData(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPages=6`)

  return {
    props:{
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    }
  }
}