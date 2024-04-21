import React, {useState} from 'react';
import { Button, Avatar, Card, Title, Paragraph, Image } from 'react-native-paper';
import { FlatList, View, Text } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'zamień: Margaryna na Masło',
  },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Ogórek',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Masło',
//   },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d91',
  //   title: 'Jabłko',
  // },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d89',
  //   title: 'Masło',
  // },
  // {
  //   id: '58694a0f-3da1-471f-bd96-145571e29d52',
  //   title: 'Masło',
  // },
];

const WYNIK = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'City: 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Real: 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f66',
    title: 'Real(karne): 4',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f68',
    title: 'City(karne): 3',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Barca: 4',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f65',
    title: 'PSG: 6',
  },
  
];

const Item = ({title}) => (
  <View className = 'list-decimal list-inside space-y-2'>
    <View className="flex mb-2">
    <Text className = 'font-bold'>{title}</Text>
  </View>
  </View>
);



const Help = ({ title }) => { 
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOkPress = () => setIsExpanded(!isExpanded);
  const handleCancelPress = () => setIsExpanded(false);
  return (
 
    <Card className="m-5">
      <Card.Title title={title} left={LeftContent} />
      <Card.Content>
        
        {isExpanded && (
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        )}
      </Card.Content>
      
        <Card.Actions>
          {isExpanded && (<Button onPress={handleCancelPress}>Less</Button>)}
          
          {!isExpanded && (
          <Button onPress={handleOkPress}>More</Button>
          )}
        </Card.Actions>
      
    </Card>
        
  );
}

export default Help;