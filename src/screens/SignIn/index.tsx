import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Spinner from "react-native-loading-spinner-overlay";

import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import Banner from "../../assets/banner1.png";

import {
  Container,
  Title,
  BackButton,
  ImageContainer,
  Content,
  ForgotButton,
  Text,
  TextError,
} from "./styles";
import { AsyncStorageSaveItem } from "../../utils/asyncStorage";
import { Formik } from "formik";
import { schemaLogin } from "../../utils/formValidations/signupValidation";

export function SignIn() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container paddingTop={getStatusBarHeight() + 40}>
      <BackButton onPress={() => handleGoBack()}>
        <MaterialIcons
          name="chevron-left"
          size={40}
          color={COLORS.WHITE_900}
          activeOpacity={0.7}
        />
      </BackButton>

      <ImageContainer>
        <Image source={Banner} />
      </ImageContainer>

      <Spinner
        visible={loading}
        textContent={'Loading...'}
        color={COLORS.WHITE_900}
        textStyle={{color: COLORS.BUTTON}}
      />
      <Content>
        <Title>Credenciais de acesso</Title>

        <Formik
          initialValues={{
            email: "tcc@unip.br",
            password: "123456",
          }}
          onSubmit={(values, { resetForm, setFieldError }) => {
            setLoading(true);

            signInWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
                navigation.navigate('home');
              })
              .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                const errorCode = error.code;
                Alert.alert('Ocorreu um erro ao realizar essa operação, tente novamente.')
                console.log(errorMessage);
              });
            resetForm({});
          }}
          validationSchema={schemaLogin}
        >
          {({ handleSubmit, handleChange, errors, values, touched }) => (
            <>
              <Input
                label="Email"
                isRequired
                placeholder="Digite aqui o seu email"
                type="secondary"
                autoCorrect={false}
                autoFocus
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                returnKeyType="next"
              />
              {errors.email && touched.email && (
                <TextError>{errors.email}</TextError>
              )}
              <Input
                label="Senha"
                isRequired
                placeholder="Digite aqui a sua senha"
                type="secondary"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.password}
                onChangeText={handleChange('password')}
                returnKeyType="send"
                secureTextEntry
              />
              {errors.password && touched.password && (
                <TextError>{errors.password}</TextError>
              )}
              <ButtonIcon
                type="primary"
                title="Confirmar e continuar"
                icon="login"
                onPress={() => handleSubmit()}
                style={{ marginTop: 20 }}
              />
            </>
          )}
        </Formik>

        {/* <ForgotButton
          onPress={() => navigation.navigate("forgotPassword")}
          activeOpacity={0.7}
        >
          <Text>Esqueci minha senha</Text>
        </ForgotButton> */}
      </Content>
    </Container>
  );
}
