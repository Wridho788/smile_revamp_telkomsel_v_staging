import { Dispatch, SetStateAction, useCallback } from "react";
import { useLazyKeywordGeneralDetailQuery } from "redux/features/keyword/keyword-api-slice";
import { CreateKeywordGeneral, KeywordBonusHelper } from "../initial";

const usePayloadToInitial = () => {
  const [getKeywordDetail] = useLazyKeywordGeneralDetailQuery();
  const keywordCreate = CreateKeywordGeneral;
  let keywordBonusHelper = KeywordBonusHelper;
  const handlePayloadToInitial = useCallback(
    async (
      _id: string | undefined,
      setIsPayload: Dispatch<SetStateAction<boolean>>
    ) => {
      await getKeywordDetail(_id).then((res) => {
        if (res.isSuccess === true) {
          keywordCreate.eligibility = { ...res.data.eligibility };
          keywordCreate.bonus = [...res.data.bonus];
          keywordCreate.notification = [...res.data.notification];
          keywordBonusHelper.bonus_type = res.data.bonus.map(
            (e: any) => e.bonus_type
          );
          setIsPayload(true);
        }
      });
    },
    [getKeywordDetail, keywordCreate]
  );

  return { onPayloadToInitial: handlePayloadToInitial };
};

export default usePayloadToInitial;
