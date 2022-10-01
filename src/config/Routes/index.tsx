import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  MyTelkomsel,
  Dashboard,
  ProgramPage,
  CreateProgram,
  CreateKeyword,
  EditProgram,
  Keyword,
  MerchantManagement,
  CustomerManagement,
  LocationManagement,
  Auth,
  ProgramMainInfoUpdate,
  ProgramNotificationUpdate,
  MerchantPartnerManagement,
  MerchantOutletManagement,
  UpdateKeyword,
} from "../../pages";

import NotificationManagement from "../../pages/NotificationManagement";
import { Segmentation } from "../../components/organisms/CreateProgram";

// "AuthProvider" & "Protected"
import Protected from "./Protected";
import SignOut from "../../pages/SignOut";
import { useAppDispatch, useAppSelector } from "service/hooks";
import { AUTH_SET_TOKEN } from "redux/features/auth/auth-store-slice";

const Index = () => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector((state) => state.auth.access_token);
  const refresh_token = useAppSelector((state) => state.auth.refresh_token);

  let isToken = access_token && refresh_token ? true : false;

  if (!isToken) {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://10.37.189.70:7443") return;
      const data = {
        access_token: e.data.access_token ?? "",
        refresh_token: e.data.refresh_token ?? "",
        expires_in: e.data.expires_in ?? 0,
        token_type: e.data.token_type ?? "",
      };
      console.log(data);
      dispatch(AUTH_SET_TOKEN(data));
    });
  }

  return (
    <Routes>
      {/* ----------------------------------- Not Protected Route ------------------------------------ */}
      <Route path="/login" element={<Auth />} />

      {/* ------------------------------------- Protected Routes ------------------------------------- */}
      {isToken ? (
        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      ) : (
        <></>
      )}

      <Route
        path="/myTelkomsel"
        element={
          <Protected>
            <MyTelkomsel />
          </Protected>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />

      <Route
        path="/program-management"
        element={
          <Protected>
            <ProgramPage />
          </Protected>
        }
      />

      <Route
        path="/keyword-management"
        element={
          <Protected>
            <Keyword />
          </Protected>
        }
      />

      <Route
        path="/create-program"
        element={
          <Protected>
            <CreateProgram />
          </Protected>
        }
      />

      <Route
        path="/edit-program/:_id"
        element={
          <Protected>
            <EditProgram />
          </Protected>
        }
      />

      <Route
        path="/edit-program/main-info/:_id"
        element={
          <Protected>
            <ProgramMainInfoUpdate />
          </Protected>
        }
      />

      <Route
        path="/edit-program/notification/:_id"
        element={
          <Protected>
            <ProgramNotificationUpdate />
          </Protected>
        }
      />

      {/* TODO: Create Keyword */}
      <Route
        path="/create-keyword"
        element={
          <Protected>
            <CreateKeyword />
          </Protected>
        }
      />

      {/* TODO: Update Keyword */}
      <Route
        path="/update-keyword/:_id"
        element={
          <Protected>
            <UpdateKeyword />
          </Protected>
        }
      />

      <Route
        path="/merchant-management"
        element={
          <Protected>
            <MerchantManagement />
          </Protected>
        }
      />
      <Route
        path="/merchant-partner-management"
        element={
          <Protected>
            <MerchantPartnerManagement />
          </Protected>
        }
      />
      <Route
        path="/merchant-outlet-management"
        element={
          <Protected>
            <MerchantOutletManagement />
          </Protected>
        }
      />

      <Route
        path="/customer-management"
        element={
          <Protected>
            <CustomerManagement />
          </Protected>
        }
      />

      <Route
        path="/notification-management"
        element={
          <Protected>
            <NotificationManagement />
          </Protected>
        }
      />

      <Route path="/location-management" element={<LocationManagement />} />

      <Route
        path={"/edit-program/segmentation/:programId"}
        element={
          <Protected>
            <Segmentation />
          </Protected>
        }
      />
      <Route path="/signOut" element={<SignOut />} />
    </Routes>
  );
};

export default Index;
