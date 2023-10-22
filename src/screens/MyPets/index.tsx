import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import { Input } from "@components/Input";
import { schemaPets } from "../../utils/formValidations/myPets";

import {
  Container,
  ProfileContainer,
  InputGroup,
  BackButton,
  Content,
  TextError,
  FormContent,
  AddButton,
  Pet,
  Pets,
  Text,
  Title,
  PetsList
} from "./styles";


interface PetsProps {
  name: string;
}
export function MyPets() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();

  const [pets, setPets] = useState<PetsProps[]>([{name: "Naruto"}]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container paddingTop={getStatusBarHeight() + 40}>
      <BackButton onPress={() => handleGoBack()} activeOpacity={0.7}>
        <MaterialIcons name="chevron-left" size={40} color={COLORS.WHITE_900} />
      </BackButton>

      <Content>
        <ProfileContainer>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={(values, { resetForm }) => {
              setPets([...pets, { name:values.name }])
              resetForm({});
            }}
            validationSchema={schemaPets}
          >
            {({ handleSubmit, handleChange, errors, values, touched }) => (
                <FormContent>
                  <InputGroup>
                    <Input
                      label="Nome/Espécie:"
                      isRequired
                      placeholder="Digite aqui"
                      type="secondary"
                      autoCorrect={false}
                      autoFocus
                      autoCapitalize="none"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      returnKeyType="done"
                    />
                    {errors.name && touched.name && (
                      <TextError>{errors.name}</TextError>
                    )}
                  </InputGroup>
                  <AddButton activeOpacity={0.7} onPress={() => handleSubmit()}>
                    <MaterialIcons name="add" size={30} color={COLORS.WHITE_900} />
                  </AddButton>
                </FormContent>
            )}
          </Formik>
        </ProfileContainer>
        
        <Pets>
          <Title>Meus pets</Title>
          
          {pets.length > 0 ? 
            <PetsList showsVerticalScrollIndicator={false}>
            {pets?.map(pet => (
              <Pet activeOpacity={0.7} key={pet.name} onPress={() => navigation.navigate('petDetails')}>
                <Text>{pet.name}</Text>
                <MaterialIcons name="chevron-right" size={24} color={COLORS.WHITE_900} />
              </Pet>
            ))}
            </PetsList> 
            : 
            <Text>Você ainda não tem pets cadastrado</Text>
          }
        </Pets>
       
      </Content>
    </Container>
  );
}
