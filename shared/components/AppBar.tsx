import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { color } from "react-native-tailwindcss";
import { Link, useLocation, useNavigate } from "react-router-native";

import { useBar } from "../../App";
import { useAuth } from "../../utils/auth";
import { AppSearch } from "./AppSearch";
import { SubmitButton } from "./Button.submit";
import { MemoRowItem, RowItem } from "./ListItem";

type TabProps = { children: React.ReactNode; to: string };

export function AppBar() {
  const [isBarOn, setBarStatus] = useBar();

  return (
    <View className="flex flex-col w-full">
      <StatusBar style="light" />
      <BarNavigation />
      {isBarOn && <AppNotification />}
      {isBarOn && <AdBlock />}
      {isBarOn && <AuthStatus />}
      {isBarOn && <AppSearch />}
    </View>
  );

  function BarNavigation() {
    return (
      <View
        className="flex flex-row w-full bg-slate-600"
        style={{ paddingTop: Constants.statusBarHeight }}
      >
        <ScrollView
          horizontal
          style={{ paddingBottom: Constants.statusBarHeight * 0.5 }}
        >
          <View className="flex flex-row">
            <Switch
              trackColor={{ false: color.gray200, true: color.purple400 }}
              thumbColor={color.gray100}
              ios_backgroundColor={color.gray800}
              onValueChange={() => setBarStatus((prev) => !prev)}
              value={isBarOn}
            />
            <Text className="pt-2 pl-1 pr-3 text-xl font-bold capitalize text-slate-200">
              on/off
            </Text>
          </View>
          {/* TODO: automate links aggregation */}
          <AppBarTab to="/">menu</AppBarTab>
          <AppBarTab to="/protected">protected</AppBarTab>
          <AppBarTab to="/github">github</AppBarTab>
          <AppBarTab to="/linking">linking</AppBarTab>
          <AppBarTab to="/native-image">image</AppBarTab>
          <AppBarTab to="/drawer">drawer</AppBarTab>
          <AppBarTab to="/listing">listing</AppBarTab>
          <AppBarTab to="/list">list</AppBarTab>
          <AppBarTab to="/signin">sign in</AppBarTab>
          <AppBarTab to="/swipe-simple">swipe-simple</AppBarTab>
          <AppBarTab to="/swipe-inside">swipe-inside</AppBarTab>
          <AppBarTab to="/swipe-class">swipe-class</AppBarTab>
          <AppBarTab to="/swipe-outside">swipe-outside</AppBarTab>
        </ScrollView>
      </View>
    );
  }
}

function AppNotification() {
  return (
    <View>
      <Text className="text-slate-200" numberOfLines={1}>
        A very long and text let see what happens over here!, let's add a bit
        more text
      </Text>
    </View>
  );
}

function AdBlock() {
  return (
    <View>
      <RowItem
        imageUrl="https://placekitten.com/300/300"
        itemTitle="Ads"
        isSelected
      >
        <Text className="text-slate-200">
          How to Create Apple TV Application with React Native
        </Text>
      </RowItem>
    </View>
  );
}

function AppBarTab({ children, to }: TabProps) {
  // console.log("chaging to", to);
  const { pathname } = useLocation();
  const style =
    pathname == to
      ? "px-3 pt-2 text-xl font-bold capitalize text-slate-200"
      : "px-3 pt-2 text-xl font-bold capitalize text-slate-400";
  return (
    <Link to={to}>
      <Text className={style}>{children}</Text>
    </Link>
  );
}

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user?.token) {
    return (
      <Text className="text-xl text-center text-slate-200">
        You are not logged in.
      </Text>
    );
  }

  // todo: enhance layout
  return (
    <>
      <MemoRowItem
        itemTitle={`Welcome ${auth.user.name}!`}
        imageUrl={auth.user.image}
        imageStyles="w-[50px] h-[50px] rounded-full shadow-sm items-center justify-center"
        isSelected={false}
      >
        <SubmitButton
          onPress={() => {
            auth.logout(() => navigate("/github"));
          }}
        >
          log out!
        </SubmitButton>
      </MemoRowItem>
    </>
  );
}
