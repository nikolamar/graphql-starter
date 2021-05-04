import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {View, StatusBar} from 'react-native';
import {SettingsProps, ListItemType} from '../../types';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem, Icon} from 'react-native-elements';
import {MeDocument, MeQuery, useLogoutMutation} from '../../generated/graphql';
import {useApolloClient} from '@apollo/client';

const list: ListItemType[] = [
  {
    title: 'Log out',
    icon: 'flight-takeoff',
  },
];

export const Settings: FC<SettingsProps> = ({navigation}) => {
  const {dark} = useTheme();
  const apollo = useApolloClient();
  const [logout] = useLogoutMutation();

  const handleListItem = async (l: ListItemType) => {
    if (l.title === 'Log out') {
      try {
        await logout({
          update: cache => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: null,
              },
            });
          },
        });
        await apollo.clearStore();
      } catch (err) {
        console.log(err);
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View>
        {list.map((l, i) => (
          <ListItem key={i} onPress={() => handleListItem(l)} bottomDivider>
            <Icon name={l.icon} />
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
              {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </SafeAreaView>
  );
};
