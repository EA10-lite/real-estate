import { Box, Flex, Text, Spacer, Avatar} from '@chakra-ui/react';
import { FaBed, FaBath} from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go'
import millify from 'millify';

import { baseUrl, fetchData } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({data : { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos }}) => {
    console.log('data', photos);

    return (
        <Box maxWidth="1000px" margin="auto" p="4">
            { photos && <ImageScrollbar data={photos} />}
            <Box w="full" p="6">
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400"> {isVerified && <GoVerified />} </Box>
                        <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `${rentFrequency}`} </Text>
                    </Flex>
                    <Box>
                        <Avatar size="sm" src={agency?.logo?.url} />
                    </Box>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between" p="1" w="250px" color="blue.400">
                    {rooms} <FaBed /> | <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Box marginTop="2" fontSize="lg" marginBottom="2" fontWeight="bold">
                    <Text fontSize="lg"> { title} </Text>
                    <Text lineHeight="2" color="gray.600"> {description} </Text>
                </Box>
                <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text> Type </Text>
                        <Text fontWeight="bold"> { type } </Text>
                    </Flex>
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text> Purpose </Text>
                        <Text fontWeight="bold"> { purpose } </Text>
                    </Flex>
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text> Furnishing Status </Text>
                        <Text fontWeight="bold"> { furnishingStatus } </Text>
                    </Flex>
                </Flex>
                <Box>
                    { amenities.length && <Text fontSize="2xl" marginTop="5" fontWeight="black"> Amenities </Text>}
                    <Flex flexWrap="wrap">
                        {amenities?.map(item => (
                            item.amenities.map(amenity =>(
                                <Text 
                                    key={amenity.text}
                                    fontWeight="bold"
                                    color="blue.400"
                                    p="2"
                                    bg="gray.200"
                                    m="1"
                                    borderRadius="5"
                                > { amenity.text } </Text>
                            ))
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertyDetails;


export async function getServerSideProps({params: {id}}){
    const data = await fetchData(`${baseUrl}/properties/detail?externalID=${id}`)

    return {
        props:{
            data,
        }
    }
}
