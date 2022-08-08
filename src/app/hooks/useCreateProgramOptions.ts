import React from "react";
import useCreateProgram from "../context/CreateProgram/useCreateProgram";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

const useCreateProgramOptions = () => {
  const { getProgramPage } = useActions();
  const { result, error, loading } = useTypedSelector((state) => state.program);

  React.useEffect(() => {
    getProgramPage();
  }, [result]);

  const main_info = {
    program_type: result.main_info.program_type,
    point_type: result.main_info.point_type,
    program_mechanism: result.main_info.mechanism,
    program_owner: result.main_info.owner,
  };

  return {
    main_info,
  };
};

export const useProgramType = (options: any) => {
  const { programData, setProgramData } = useCreateProgram();

  const programTypeLabel =
    options?.find(
      (option: { _id: any }) => option._id === programData.program_type
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) => option._id === programData.program_type
        )?.set_value
      : "";

  const handleChangeProgramType = async (value: string) => {
    const program_type_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setProgramData((prevState: any) => ({
      ...prevState,
      program_type: program_type_id,
    }));
  };

  return { programTypeLabel, handleChangeProgramType };
};

export const useName = () => {
  const { programData, setProgramData } = useCreateProgram();

  const nameLabel = programData.name !== undefined ? programData.name : "";

  const handleChangeName = async (value: string) => {
    await setProgramData((prevState: any) => ({
      ...prevState,
      name: value,
    }));
  };

  return { nameLabel, handleChangeName };
};

export const usePointType = (options: any) => {
  const { programData, setProgramData } = useCreateProgram();

  const pointTypeLabel =
    options?.find(
      (option: { _id: any }) => option._id === programData.point_type
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) => option._id === programData.point_type
        )?.set_value
      : "";

  const handleChangePointType = async (value: string) => {
    const point_type_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setProgramData((prevState: any) => ({
      ...prevState,
      point_type: point_type_id,
    }));
  };

  return { pointTypeLabel, handleChangePointType };
};

export const useProgramMechanism = (options: any) => {
  const { programData, setProgramData } = useCreateProgram();

  const programMechanismLabel =
    options?.find(
      (option: { _id: any }) => option._id === programData.program_mechanism
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) => option._id === programData.program_mechanism
        )?.set_value
      : "";

  const handleChangeProgramMechanism = async (value: string) => {
    const program_mechanism_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setProgramData((prevState: any) => ({
      ...prevState,
      program_mechanism: program_mechanism_id,
    }));
  };

  return { programMechanismLabel, handleChangeProgramMechanism };
};

export const useProgramOwner = (options: any) => {
  const { programData, setProgramData } = useCreateProgram();

  const programOwnerLabel =
    options?.find(
      (option: { _id: any }) => option._id === programData.program_owner
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) => option._id === programData.program_owner
        )?.set_value
      : "";

  const handleChangeProgramOwner = async (value: string) => {
    const program_owner_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setProgramData((prevState: any) => ({
      ...prevState,
      program_owner: program_owner_id,
    }));
  };

  return { programOwnerLabel, handleChangeProgramOwner };
};

export default useCreateProgramOptions;
