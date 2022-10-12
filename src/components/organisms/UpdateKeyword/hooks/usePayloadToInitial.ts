import { cloneDeep } from "lodash";
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
          keywordCreate._id = res.data._id;
          keywordCreate.bonus = cloneDeep(res.data.bonus);
          keywordCreate.notification = cloneDeep(res.data.notification);
          keywordCreate.is_draft = res.data.is_draft;
          keywordBonusHelper.bonus_type = res.data.bonus.map(
            (e: any) => e.bonus_type
          );

          keywordCreate.eligibility.name = res.data.eligibility.name ?? "";
          keywordCreate.eligibility.start_period =
            res.data.eligibility.start_period ?? "";
          keywordCreate.eligibility.end_period =
            res.data.eligibility.end_period ?? "";
          keywordCreate.eligibility.keyword_type =
            res.data.eligibility.keyword_type ?? "";
          keywordCreate.eligibility.point_type =
            res.data.eligibility.point_type ?? "";
          keywordCreate.eligibility.poin_value =
            res.data.eligibility.poin_value ?? "";
          keywordCreate.eligibility.poin_redeemed =
            res.data.eligibility.poin_redeemed ?? 0;
          keywordCreate.eligibility.channel_validation =
            res.data.eligibility.channel_validation ?? false;
          keywordCreate.eligibility.channel_validation_list =
            cloneDeep(res.data.eligibility.channel_validation_list) ?? [];
          keywordCreate.eligibility.program_id =
            res.data.eligibility.program_id ?? "";
          keywordCreate.eligibility.eligibility_locations =
            res.data.eligibility.eligibility_locations ?? false;
          keywordCreate.eligibility.locations =
            cloneDeep(res.data.eligibility.locations) ?? [];
          keywordCreate.eligibility.program_title_expose =
            res.data.eligibility.program_title_expose ?? "";
          keywordCreate.eligibility.program_experience =
            cloneDeep(res.data.eligibility.program_experience) ?? [];
          keywordCreate.eligibility.program_bersubsidi =
            res.data.eligibility.program_bersubsidi ?? false;
          keywordCreate.eligibility.merchant =
            res.data.eligibility.merchant ?? "";
          keywordCreate.eligibility.merchandise_keyword =
            res.data.eligibility.merchandise_keyword ?? false;
          keywordCreate.eligibility.keyword_schedule =
            res.data.eligibility.keyword_schedule ?? "";
          keywordCreate.eligibility.total_budget =
            res.data.eligibility.total_budget ?? 0;
          keywordCreate.eligibility.customer_value =
            res.data.eligibility.customer_value ?? 0;
          keywordCreate.eligibility.multiwhitelist =
            res.data.eligibility.multiwhitelist ?? false;
          keywordCreate.eligibility.multiwhitelist_program =
            res.data.eligibility.multiwhitelist_program ?? "";
          keywordCreate.eligibility.enable_sms_masking =
            res.data.eligibility.enable_sms_masking ?? false;
          keywordCreate.eligibility.sms_masking =
            res.data.eligibility.sms_masking ?? "";
          keywordCreate.eligibility.timezone =
            res.data.eligibility.timezone ?? "";
          keywordCreate.eligibility.for_new_redeemer =
            res.data.eligibility.for_new_redeemer ?? false;
          keywordCreate.eligibility.max_mode =
            res.data.eligibility.max_mode ?? "";
          keywordCreate.eligibility.max_redeem_counter =
            res.data.eligibility.max_redeem_counter ?? 0;
          keywordCreate.eligibility.segmentation_customer_tier =
            cloneDeep(res.data.eligibility.segmentation_customer_tier) ?? [];
          keywordCreate.eligibility.segmentation_customer_los_operator =
            res.data.eligibility.segmentation_customer_los_operator ?? "";
          keywordCreate.eligibility.segmentation_customer_los =
            res.data.eligibility.segmentation_customer_los ?? 0;
          keywordCreate.eligibility.segmentation_customer_los_max =
            res.data.eligibility.segmentation_customer_los_max ?? 0;
          keywordCreate.eligibility.segmentation_customer_los_min =
            res.data.eligibility.segmentation_customer_los_min ?? 0;
          keywordCreate.eligibility.segmentation_customer_type =
            res.data.eligibility.segmentation_customer_type ?? "";
          keywordCreate.eligibility.segmentation_customer_most_redeem =
            cloneDeep(res.data.eligibility.segmentation_customer_most_redeem) ??
            [];
          keywordCreate.eligibility.segmentation_customer_brand =
            cloneDeep(res.data.eligibility.segmentation_customer_brand) ?? [];
          keywordCreate.eligibility.segmentation_customer_prepaid_registration =
            res.data.eligibility.segmentation_customer_prepaid_registration ??
            false;
          keywordCreate.eligibility.segmentation_customer_kyc_completeness =
            res.data.eligibility.segmentation_customer_kyc_completeness ??
            false;
          keywordCreate.eligibility.segmentation_customer_poin_balance_operator =
            res.data.eligibility.segmentation_customer_poin_balance_operator ??
            "";
          keywordCreate.eligibility.segmentation_customer_poin_balance =
            res.data.eligibility.segmentation_customer_poin_balance ?? 0;
          keywordCreate.eligibility.segmentation_customer_poin_balance_min =
            res.data.eligibility.segmentation_customer_poin_balance_min ?? 0;
          keywordCreate.eligibility.segmentation_customer_poin_balance_max =
            res.data.eligibility.segmentation_customer_poin_balance_max ?? 0;
          keywordCreate.eligibility.segmentation_customer_preference =
            res.data.eligibility.segmentation_customer_preference ?? "";
          keywordCreate.eligibility.segmentation_customer_arpu_operator =
            res.data.eligibility.segmentation_customer_arpu_operator ?? "";
          keywordCreate.eligibility.segmentation_customer_arpu =
            res.data.eligibility.segmentation_customer_arpu ?? 0;
          keywordCreate.eligibility.segmentation_customer_arpu_min =
            res.data.eligibility.segmentation_customer_arpu_min ?? 0;
          keywordCreate.eligibility.segmentation_customer_arpu_max =
            res.data.eligibility.segmentation_customer_arpu_max ?? 0;
          keywordCreate.eligibility.segmentation_customer_preferences_bcp =
            res.data.eligibility.segmentation_customer_preferences_bcp ?? "";
          keywordCreate.eligibility.file = res.data.eligibility.file ?? "";
          keywordCreate.eligibility.segmentation_employee_numbers =
            res.data.eligibility.segmentation_employee_numbers ?? false;
          keywordCreate.eligibility.eligibility_location =
            res.data.eligibility.eligibility_location ?? false;
          keywordCreate.eligibility.location_type =
            res.data.eligibility.location_type ?? "";
          keywordCreate.eligibility.keyword_shift =
            cloneDeep(res.data.eligibility.keyword_shift) ?? [];

          setIsPayload(true);
        }
      });
    },
    [getKeywordDetail, keywordBonusHelper, keywordCreate]
  );

  return { onPayloadToInitial: handlePayloadToInitial };
};

export default usePayloadToInitial;
