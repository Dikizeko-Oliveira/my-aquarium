import React, { useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { collection, getDocs } from "firebase/firestore"; 
import { optionsMenu } from "../../utils/mockMenuOptions";
import { useGetInitialsName } from "../../utils/formatNames";
import { shadow } from "../../utils/shadowContent";
import { useAuth } from "../../services/auth/auth";
import { db, firestore } from '../../../firebase'

import {
  Container,
  Content,
  ProfileContainer,
  Title,
  Text,
  Profile,
  ImageProfile,
  BalanceContent,
  Balance,
  SemiTitle,
  DividerLine,
  MenuContainer,
  MenuContent,
  IconContainer,
  Option,
  ActionsContainer,
  ActionButton
} from "./styles";

type Reservation = 'full' | 'empty'

interface AquariumProps {
  fire: string;
  ph: number;
  reservatorio: Reservation;
  temperatura: number;
  turbidez: number;
  updatedAt: string;
  
}

interface RoutineProps {
  value: number;
  isValid: boolean;
  
}
export function Home() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const { user } = useAuth();
  const { initialName, letterName } = useGetInitialsName();
  
  const [lightOn, setLightOn] = useState(false);
  const [feederOn, setFeederOn] = useState(false);
  const [aquarium, setaquarium] = useState<AquariumProps>({} as AquariumProps)
  const [routines, setRoutines] = useState<RoutineProps>({} as RoutineProps)
  
   async function handleGetData (){
    const querySnapshot = await getDocs(collection(firestore, "aquarium"));
    querySnapshot.forEach((doc) => {
      setaquarium(doc.data() as AquariumProps);
    });
   }
  useFocusEffect(useCallback(() => {
    handleGetData()
  },[collection(firestore, "aquarium")]))
   
  return (
    <Container paddingTop={getStatusBarHeight() + 40}>
      <Content>
        <ProfileContainer>
          <View style={{ alignItems: "flex-start" }}>
            <Title>Olá, {initialName('Tcc Project')}!</Title>
            <Text>Hoje é dia de trocar a água</Text>
           
          </View>
          {user?.avatar_url ? (
            <TouchableOpacity onPress={() => navigation.navigate("profile")} activeOpacity={0.7}>
              <Profile>
                <ImageProfile source={{ uri: user.avatar_url }} />
              </Profile>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("profile")} activeOpacity={0.7}>
              <Profile>
                <Title>{letterName('Tcc Project')}</Title>
              </Profile>
            </TouchableOpacity>
          )}
        </ProfileContainer>

        <BalanceContent style={shadow}>
          <Balance>
            <SemiTitle>Status do aquário</SemiTitle>
            <Text style={{ fontSize: 16 }}>Nível de turbidez: {aquarium.turbidez}</Text>
            <Text style={{ fontSize: 16 }}>Nível de Ph: {aquarium.ph}</Text>
            <Text style={{ fontSize: 16 }}>Temperatura da água: {aquarium.temperatura}º</Text>
            <Text style={{ fontSize: 16 }}>Nível do reservatório: {aquarium.reservatorio}</Text>
            <Text style={{ fontSize: 16 }}>Presença de fogo ou fumaça: {aquarium.fire}</Text>
            <Text style={{ fontSize: 16 }}>Atualizado em: 12/10/2023 14h:00</Text>
          </Balance>
        </BalanceContent>
  
        <MenuContainer>
          <MenuContent horizontal={true} showsHorizontalScrollIndicator={false}>
            {optionsMenu.map((option) => (
              <Option
                key={option.id}
                onPress={() => navigation.navigate(option.screen)}
                activeOpacity={0.7}
              >
                <IconContainer>
                  <MaterialIcons
                    name={option.urlImage}
                    size={30}
                    color={COLORS.TITLE}
                  />
                </IconContainer>
                <SemiTitle isMenuOption color={COLORS.TITLE}>
                  {option.title}
                </SemiTitle>
              </Option>
            ))}
          </MenuContent>
        </MenuContainer>
  
        <DividerLine isMenuOption />
  
        <SemiTitle
          isMenuOption
          style={{ marginRight: "auto", fontSize: 17 }}
          color={COLORS.TITLE}
        >
          Acões rápidas:
        </SemiTitle>
  
        <ActionsContainer>
          <ActionButton activeOpacity={0.7} isOn={lightOn} onPress={() => setLightOn(!lightOn)}>
            <MaterialCommunityIcons
              name={lightOn ? 'lightbulb-on' :'lightbulb-off'}
              size={20}
              color={COLORS.TITLE}
            />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Acender lâmpada</Text>
          </ActionButton>
          <ActionButton activeOpacity={0.7} isOn={feederOn} onPress={() => setFeederOn(!feederOn)}>
            <MaterialCommunityIcons
              name={feederOn ? 'food-steak' :'food-steak-off'}
              size={20}
              color={COLORS.TITLE}
            />
            <Text style={{ fontSize: 14, marginLeft: 5 }}>Alimentador</Text>
          </ActionButton>
        </ActionsContainer>
      </Content>
    </Container>
  );
}
