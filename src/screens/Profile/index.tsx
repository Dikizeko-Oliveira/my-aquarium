import React from "react";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import { useCurrentLocationContext } from "../../contexts/CurrentLocation";
import { useGetInitialsName } from "../../utils/formatNames";
import { useAuth } from "../../services/auth/auth";
import { Input } from "../../components/Input";
import { schema } from "../../utils/formValidations/signupValidation";
import { ButtonIcon } from "../../components/ButtonIcon";

import {
  Container,
  UploadButton,
  FormContent,
  ProfileContainer,
  Profile,
  Title,
  Text,
  ImageProfile,
  BackButton,
  Content,
  TextError,
} from "./styles";

export function ProfileAccount() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const { user, signOut } = useAuth();
  const { letterName } = useGetInitialsName();
  const { currentLocation } = useCurrentLocationContext();

  const handleNavigateAndLogout = (screen: string) => {
    if (screen === "logout") {
      Alert.alert("Atenção", "Deseja realmente sair da plataforma?", [
        {
          text: "Sim",
          onPress: () => {
            signOut();
            navigation.navigate("signin");
          },
        },
        {
          text: "Não",
          onPress: () => console.log("No was Pressed"),
          style: "cancel",
        },
      ]);
    } else {
      navigation.navigate(screen);
    }
  };

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
          <UploadButton activeOpacity={0.7}>
            <MaterialIcons
              name="upload-file"
              size={30}
              color={COLORS.WHITE_900}
            />
            <Text>Carregar foto</Text>
          </UploadButton>
          {user?.avatar_url ? (
            <Profile>
              <ImageProfile source={{ uri: user.avatar_url }} />
            </Profile>
          ) : (
            <Profile>
              <Title>{letterName(user?.name)}</Title>
            </Profile>
          )}
        </ProfileContainer>

        <Formik
          initialValues={{
            name: "",
            email: "",
            cellphone_number: "",
            password: "",
            password_confirmation: "",
          }}
          onSubmit={(values, { resetForm, setFieldError }) => {
            // resetForm({});
          }}
          // validate={validateForm}
          validationSchema={schema}
        >
          {({ handleSubmit, handleChange, errors, values, touched }) => (
            <FormContent>
              <Input
                placeholder="Digite aqui o seu nome"
                type="secondary"
                borderColor={
                  errors.name && touched.name
                    ? COLORS.ERROR
                    : COLORS.PRIMARY_900
                }
                secureTextEntry={false}
                returnKeyType="next"
                autoFocus
                label="Nome"
                onChangeText={handleChange("name")}
                value={values.name}
                isRequired
              />
              {errors.name && touched.name && (
                <TextError>{errors.name}</TextError>
              )}
              <Input
                placeholder="Digite aqui o seu email"
                type="secondary"
                borderColor={
                  errors.email && touched.email
                    ? COLORS.ERROR
                    : COLORS.PRIMARY_900
                }
                label="Email"
                secureTextEntry={false}
                autoCapitalize="none"
                returnKeyType="next"
                isRequired
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <TextError>{errors.email}</TextError>
              )}
              <Input
                placeholder="Digite aqui o seu celular"
                type="secondary"
                borderColor={
                  errors.email && touched.email
                    ? COLORS.ERROR
                    : COLORS.PRIMARY_900
                }
                label="Celular"
                secureTextEntry={false}
                autoCapitalize="none"
                returnKeyType="next"
                isRequired
                onChangeText={handleChange("cellphone_number")}
                value={values.cellphone_number}
              />
              {errors.cellphone_number && touched.cellphone_number && (
                <TextError>{errors.cellphone_number}</TextError>
              )}
              <Input
                placeholder="Digite sua senha"
                type="secondary"
                borderColor={
                  errors.password && touched.password
                    ? COLORS.ERROR
                    : COLORS.PRIMARY_900
                }
                label="Sua senha"
                returnKeyType="next"
                isRequired
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password && (
                <TextError>{errors.password}</TextError>
              )}
              <Input
                placeholder="Confirme sua senha"
                type="secondary"
                borderColor={
                  errors.password_confirmation && touched.password_confirmation
                    ? COLORS.ERROR
                    : COLORS.PRIMARY_900
                }
                label="Confirmar senha"
                isRequired
                onChangeText={handleChange("password_confirmation")}
                value={values.password_confirmation}
              />
              {errors.password_confirmation &&
                touched.password_confirmation && (
                  <TextError>{errors.password_confirmation}</TextError>
                )}
              <ButtonIcon
                type="primary"
                title="Confirmar e continuar"
                icon="login"
                onPress={() => handleSubmit()}
                style={{ marginTop: 20 }}
              />
            </FormContent>
          )}
        </Formik>
      </Content>
    </Container>
  );
}
