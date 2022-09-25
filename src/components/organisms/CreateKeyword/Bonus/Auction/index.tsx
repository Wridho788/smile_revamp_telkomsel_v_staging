import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Stack,
  Button,
  Switch,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  BodyCopy,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Select,
  Subtitle,
} from "../../../../atoms";

import { Upload } from "../../../../../assets";

import {
  ICreateKeyword,
  IKeywordNotificationAuction,
  IKeywordNotificationAuctionHelper,
} from "../../interfaces";

import { FilterInitial } from "../../../../../redux/utils/initial-general";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";

import {
  useGetNotifViaQuery,
  useLazyGetKeywordNotificationQuery,
} from "../../../../../redux/features/lov/lov-api-slice";

import { useNotificationTemplateQuery } from "../../../../../redux/features/notification/notification-api-slice";

import {
  KeywordBonusAuction,
  KeywordNotificationAuction,
  KeywordNotificationAuctionHelper,
} from "../../initial";
import _find from "lodash/find";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { useKeywordUploadAuctionMutation } from "../../../../../redux/features/keyword/keyword-api-slice";
import LocationManagement from "../LocationManagement";

interface INotificationAuctionProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationAuction: React.FunctionComponent<
  INotificationAuctionProps
> = ({
  bonusType,
  bonusTypeId,
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  // Preview Image Auction
  const [preview, setPreview] = React.useState(Upload);
  const [loading, setLoading] = React.useState(false);

  const uploadInputRef: any = React.useRef<any>(null);

  const [uploadImgAuction] = useKeywordUploadAuctionMutation();

  const onUpload = () => {
    setLoading(true);
    if (uploadInputRef.current?.files.length) {
      const temp = URL.createObjectURL(uploadInputRef.current?.files[0]);
      setPreview(temp);

      const formData = new FormData();
      formData.append("image", uploadInputRef.current?.files[0]);

      uploadImgAuction(formData).then((res: any) => {
        keywordCreate.bonus[index]["auction_prize_image"] = res?.data.payload;
        setLoading(false);
      });
    }
  };

  const { data: viaOptions = { data: [] } } = useGetNotifViaQuery();
  const { data: templateOptions = { data: [] } } =
    useNotificationTemplateQuery(FilterInitial);
  const [
    getKeywordNotification,
    {
      data: keywordNotification = {
        data: [],
      },
      isLoading,
    },
  ] = useLazyGetKeywordNotificationQuery();

  const keywordNotificationAuctionHelper = KeywordNotificationAuctionHelper;
  const [
    keywordNotificationAuctionHelperState,
    setKeywordNotificationAuctionHelperState,
  ] = useState<IKeywordNotificationAuctionHelper[]>(
    keywordNotificationAuctionHelper
  );

  const keywordNotificationAuction: IKeywordNotificationAuction[] =
    KeywordNotificationAuction;

  const [keywordNotificationAuctionState, setKeywordNotificationAuctionState] =
    useState<IKeywordNotificationAuction[]>(keywordNotificationAuction);

  const { data: locationOptions, isFetching } =
      useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Auction Notification
  useEffect(() => {
    getKeywordNotification("AUCTION_NOTIFICATION");

    // Initial Keyword Bonus Auction
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "auction"
    );

    if (locationOptions && index === -1) {
      keywordCreate.bonus.push(KeywordBonusAuction);
      const bonusIdx = keywordCreate.bonus.findIndex(
          ({ bonus_type }) => bonus_type === "auction"
      );
      setIndex(bonusIdx);

      if (locationOptions) {
        keywordCreateState.eligibility.locations.map((location) =>
            keywordCreateState.bonus[bonusIdx].stock_location.push({
              name: locationOptions.find((e: any) => e["_id"] === location).name,
              location_id: location,
              stock: 0,
            })
        );

        setStateTrigger(!stateTrigger);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    setKeywordNotificationAuctionHelperState(keywordNotificationAuctionHelper);
  }, [keywordNotificationAuctionHelper, stateTrigger]);

  useEffect(() => {
    // Prevent duplicate data of "Auction"
    if (
      !_find(
        keywordCreate.notification,
        ({ bonus_type_id }) => bonus_type_id === bonusTypeId
      ) &&
      bonusType === "auction"
    ) {
      keywordCreate.notification = keywordCreate.notification.concat(
        keywordNotificationAuction
      );
    }

    setKeywordNotificationAuctionState(keywordNotificationAuction);
  }, [keywordNotificationAuction, stateTrigger]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Auction</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {keywordNotification.data.map((_: any, idx: any) => {
                keywordNotificationAuction[idx].code_identifier = _["_id"];
                keywordNotificationAuction[idx].bonus_type_id = bonusTypeId;

                return (
                  <Stack
                    key={idx}
                    spacing="1vw"
                    border="0.1vw solid rgba(0, 0, 0, 0.1)"
                    borderRadius="0.3vw"
                    p="2vw"
                  >
                    <Subtitle color="warning.main">{_.set_value}</Subtitle>
                    <OutlinedTextField
                      disabled={true}
                      direction="column"
                      label="Keyword Name"
                      variant="outlined"
                      value={keywordCreateState.eligibility.name}
                      handleChange={(value: string) => {
                        keywordCreate.eligibility.name = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <Select
                      direction="column"
                      label="Notification Template"
                      placeholder="Option"
                      options={templateOptions.data}
                      optionLabel={"notif_name"}
                      value={
                        keywordNotificationAuctionHelperState[idx]
                          .notification_template
                      }
                      handleChange={(value: string) => {
                        keywordNotificationAuctionHelper[
                          idx
                        ].notification_template = value;
                        keywordNotificationAuction[idx].notification_content =
                          templateOptions?.data?.find((e) => e["_id"] === value)
                            ?.notif_content ?? "";
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    {keywordNotificationAuctionHelperState[idx]
                      .notification_template !== "" && (
                      <OutlinedTextField
                        direction="column"
                        label="Notification Content"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={
                          keywordNotificationAuctionState[idx]
                            .notification_content
                        }
                        handleChange={(value: string) => {
                          keywordNotificationAuction[idx].notification_content =
                            value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    )}
                    {keywordNotificationAuctionHelperState[idx]
                      .notification_template !== "" && (
                      <Stack direction="row" spacing="1vw">
                        <Button
                          onClick={() => {
                            keywordNotificationAuction[
                              idx
                            ].notification_content += `[KeywordName]`;
                            setStateTrigger(!stateTrigger);
                          }}
                          color="primary"
                          variant="outlined"
                          endIcon={<AddBoxIcon fontSize="large" />}
                          sx={{
                            borderRadius: "0.3vw",
                            paddingInline: "1.5vw",
                            paddingBlock: "0.5vw",
                            textTransform: "capitalize",
                          }}
                        >
                          [KeywordName]
                        </Button>
                        <Button
                          onClick={() => {
                            keywordNotificationAuction[
                              idx
                            ].notification_content += `[StartPeriod]`;
                            setStateTrigger(!stateTrigger);
                          }}
                          color="primary"
                          variant="outlined"
                          endIcon={<AddBoxIcon fontSize="large" />}
                          sx={{
                            borderRadius: "0.3vw",
                            paddingInline: "1.5vw",
                            paddingBlock: "0.5vw",
                            textTransform: "capitalize",
                          }}
                        >
                          [StartPeriod]
                        </Button>
                        <Button
                          onClick={() => {
                            keywordNotificationAuction[
                              idx
                            ].notification_content += `[EndPeriod]`;
                            setStateTrigger(!stateTrigger);
                          }}
                          color="primary"
                          variant="outlined"
                          endIcon={<AddBoxIcon fontSize="large" />}
                          sx={{
                            borderRadius: "0.3vw",
                            paddingInline: "1.5vw",
                            paddingBlock: "0.5vw",
                            textTransform: "capitalize",
                          }}
                        >
                          [EndPeriod]
                        </Button>
                      </Stack>
                    )}
                    <Select
                      direction="column"
                      label="Notification Via"
                      placeholder="Option"
                      options={viaOptions.data}
                      value={keywordNotificationAuctionState[idx].via}
                      handleChange={(value: string) => {
                        keywordNotificationAuction[idx].via = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <Stack direction="row" spacing="0.5vw" alignItems="center">
                      <Switch
                        checked={
                          keywordNotificationAuctionHelperState[idx]
                            .follow_period
                        }
                        onChange={(e) => {
                          keywordNotificationAuctionHelper[idx].follow_period =
                            e.target.checked;
                          if (e.target.checked) {
                            keywordNotificationAuction[idx].start_period =
                              keywordCreateState.eligibility.start_period;
                            keywordNotificationAuction[idx].end_period =
                              keywordCreateState.eligibility.end_period;
                          }
                          setStateTrigger(!stateTrigger);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <BodyCopy>Follow Period of Keyword Redeem</BodyCopy>
                    </Stack>
                    <Stack direction="row" spacing="2vw" alignItems="center">
                      <ResponsiveDateTimePicker
                        disabled={
                          keywordNotificationAuctionHelperState[idx]
                            .follow_period
                        }
                        direction="column"
                        label="From"
                        placeholder="From"
                        value={
                          keywordNotificationAuctionState[idx].start_period
                        }
                        handleChange={(value: Date) => {
                          keywordNotificationAuction[idx].start_period = value;
                          if (
                            keywordNotificationAuctionState[idx].end_period <=
                            value
                          ) {
                            keywordNotificationAuction[idx].end_period = value;
                          }
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                      <ResponsiveDateTimePicker
                        disabled={
                          keywordNotificationAuctionHelperState[idx]
                            .follow_period
                        }
                        direction="column"
                        label="To"
                        placeholder="To"
                        minDateTime={
                          keywordNotificationAuctionState[idx].start_period
                        }
                        value={keywordNotificationAuctionState[idx].end_period}
                        handleChange={(value: Date) => {
                          keywordNotificationAuction[idx].end_period = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Stack>
                  </Stack>
                );
              })}

              {index !== -1 && (
                <Stack spacing={4}>
                  <Stack spacing={2} direction="row">
                    <OutlinedTextField
                      direction="column"
                      label="Poin Min Bidding"
                      variant="outlined"
                      value={
                        keywordCreate.bonus[index]["auction_poin_min_bidding"]
                      }
                      handleChange={(value: string) => {
                        keywordCreate.bonus[index]["auction_poin_min_bidding"] =
                          Number(value);
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <OutlinedTextField
                      direction="column"
                      label="Poin Multiplier"
                      variant="outlined"
                      value={
                        keywordCreate.bonus[index]["auction_multiplier_poin"]
                      }
                      handleChange={(value: string) => {
                        keywordCreate.bonus[index]["auction_multiplier_poin"] =
                          Number(value);
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <OutlinedTextField
                      direction="column"
                      label="Max Winner in a Phase"
                      variant="outlined"
                      value={
                        keywordCreate.bonus[index]["auction_max_winner_inphase"]
                      }
                      handleChange={(value: string) => {
                        keywordCreate.bonus[index][
                          "auction_max_winner_inphase"
                        ] = Number(value);
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  </Stack>
                  <Stack spacing={2}>
                    <Subtitle color="warning.main">
                      PRIZE CONFIGURATION
                    </Subtitle>
                    <OutlinedTextField
                      direction="column"
                      label="Prize Name"
                      variant="outlined"
                      value={keywordCreate.bonus[index]["auction_prize_name"]}
                      handleChange={(value: string) => {
                        keywordCreate.bonus[index]["auction_prize_name"] =
                          value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <Stack spacing={2} direction="row">
                      <OutlinedTextField
                        direction="column"
                        label="Prize Description"
                        variant="outlined"
                        value={
                          keywordCreate.bonus[index]["auction_prize_desc_id"]
                        }
                        handleChange={(value: string) => {
                          keywordCreate.bonus[index]["auction_prize_desc_id"] =
                            value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                      <OutlinedTextField
                        direction="column"
                        label="Prize Description English"
                        variant="outlined"
                        value={
                          keywordCreate.bonus[index]["auction_prize_desc_en"]
                        }
                        handleChange={(value: string) => {
                          keywordCreate.bonus[index]["auction_prize_desc_en"] =
                            value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Stack>
                    <Stack spacing={2}>
                      {!loading ? (
                        <Box
                          component="img"
                          alt="Telkomsel Upload"
                          src={preview}
                        ></Box>
                      ) : (
                        <CircularProgress></CircularProgress>
                      )}
                      <Button
                        variant="contained"
                        component="label"
                        onChange={onUpload}
                      >
                        Upload
                        <input
                          hidden
                          ref={uploadInputRef}
                          accept="image/*"
                          type="file"
                        />
                      </Button>
                    </Stack>
                  </Stack>

                  {/* Stock Location Management */}
                  <Stack>
                    {locationOptions && <LocationManagement
                        bonusType="auction"
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                    />}
                  </Stack>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotificationAuction;
