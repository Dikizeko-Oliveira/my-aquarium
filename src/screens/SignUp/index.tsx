import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Formik } from 'formik';
import { ActivityIndicator, Alert, Image } from "react-native";
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import {schema, validateForm} from '../../utils/formValidations/signupValidation';
import { CreateAccountService, CreateUserProps } from "../../services/GetUserToAuthenticate";

import Banner from "../../assets/banner1.png";

import {
  Container,
  ImageContainer,
  Title,
  Content,
  Text,
  TextError,
  SignUpButton,
  ButtonContainer,
  BackButton,
  ContentContainer,
} from "./styles";

export function SignUp() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  
  const [next, setNext] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [cellphoneNumber, setCellPhoneNumber] = useState('');
  const [formValues, setFormValues] = useState<CreateUserProps>({} as CreateUserProps)
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const handleSignUp = async (data: CreateUserProps): Promise<void> => {
    setLoading(true)
    try {
      await CreateAccountService(data);
      setLoading(false);
      showMessage({
        message: 'Seu cadastro realizado com sucesso!',
        type: 'success'
      });
      navigation.navigate('confirmAccount', { 
        cellphone_number: cellphoneNumber
      })
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      const err = JSON.parse(error.response.request._response);
      if(err.message && err.code !== 500){
        Alert.alert('Atenção',`${err.message}`);
      } else {
        Alert.alert('Atenção','An error occurred while signing up, try again');
      }
    }
  }
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  return (
    <Container paddingTop={getStatusBarHeight() + 40}>
      <BackButton onPress={() => handleGoBack()}>
        <MaterialIcons name="chevron-left" size={40} color={COLORS.WHITE_900} activeOpacity={0.7}/>
      </BackButton>
      
      <ImageContainer>
        <Image source={Banner} />
      </ImageContainer>
        {/* <ActivityIndicator 
        animating={loading}
        color={COLORS.WHITE_900}
        size='large'
      /> */}
      <ContentContainer>
        <Title>
          Faça seu cadastro na{"\n"} plataforma
        </Title>
      
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values, { resetForm , setFieldError}) => {
          
            // resetForm({});
          }}
          // validate={validateForm} 
          validationSchema={schema}
          >
           {({ handleSubmit, handleChange, errors, values, touched }) => ( 
            <Content>
              <Input
                placeholder="Digite aqui o seu nome"
                type="secondary"
                borderColor={errors.name && touched.name ? COLORS.ERROR : COLORS.PRIMARY_900}
                secureTextEntry={false}
                returnKeyType="next"
                autoFocus
                label="Nome"
                onChangeText={handleChange('name')}
                value={values.name}
                isRequired />
              {errors.name && touched.name && (
                <TextError>
                  {errors.name}
                </TextError>
              )}
              <Input
                placeholder="Digite aqui o seu email"
                type="secondary"
                borderColor={errors.email && touched.email ? COLORS.ERROR : COLORS.PRIMARY_900}
                label="Email"
                secureTextEntry={false}
                autoCapitalize="none"
                returnKeyType="next"
                isRequired
                onChangeText={handleChange('email')}
                value={values.email} />
              {errors.email && touched.email && (
                <TextError>
                  {errors.email}
                </TextError>
              )}
              <Input
                placeholder="Digite sua senha"
                type="secondary"
                borderColor={errors.password && touched.password ? COLORS.ERROR : COLORS.PRIMARY_900}
                label="Sua senha"
                returnKeyType="next"
                isRequired
                value={values.password}
                onChangeText={handleChange('password')}
                />
              {errors.password && touched.password && (
                <TextError>
                  {errors.password}
                </TextError>
              )}
              <Input
                placeholder="Confirme sua senha"
                type="secondary"
                borderColor={errors.password_confirmation && touched.password_confirmation ? COLORS.ERROR : COLORS.PRIMARY_900}
                label="Confirmar senha"
                isRequired
                onChangeText={handleChange('password_confirmation')}
                value={values.password_confirmation} />
              {errors.password_confirmation && touched.password_confirmation && (
                <TextError>
                  {errors.password_confirmation}
                </TextError>
              )}
            <ButtonIcon
                type="primary"
                title="Confirmar e continuar"
                icon="login"
                onPress={() => handleSubmit()}
                style={{ marginTop: 20 }} />
            </Content>
          )}
        </Formik>
      </ContentContainer>
      
    </Container>
  );
}
