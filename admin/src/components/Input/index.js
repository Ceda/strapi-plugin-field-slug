import React, { useEffect } from "react";
import {
  useCMEditViewDataManager
} from "@strapi/helper-plugin";

import {
  FieldAction,
  FieldInput,
  FieldLabel,
} from "@strapi/design-system/Field";

import { Stack } from "@strapi/design-system/Stack";
import Refresh from "@strapi/icons/Refresh";
import StrikeThrough from "@strapi/icons/StrikeThrough";
import styled from "styled-components";

import slugify from '@sindresorhus/slugify';

const Index = ({ name, value, intlLabel, attribute }) => {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  let hours = ("0" + dateObj.getHours()).slice(-2);
  let minutes = ("0" + dateObj.getMinutes()).slice(-2);
  let seconds = ("0" + dateObj.getSeconds()).slice(-2);

  let data_date;
  let datetime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

  attribute.options?.kw ? attribute.options?.kw : 'post';
  attribute.options?.pattern ? attribute.options?.pattern : 'datetime';

  attribute.options?.kw
    ? (data_date = slugify(attribute.options?.kw) + "-" + datetime)
    : (data_date = datetime);

  const generateSlug_by_Datetime = () => {
    onChange({ target: { name, value: data_date } });
  };

  const { modifiedData, onChange } = useCMEditViewDataManager();

  let data_id;
  let data_title;

  if (Number(modifiedData.id)) {
    attribute.options?.kw
      ? (data_id = slugify(attribute.options?.kw) + "-" + modifiedData.id)
      : (data_id = modifiedData.id);
  }

  const generateSlug_by_Id = () => {
    onChange({ target: { name, value: data_id } });
  };

  if (modifiedData.title) {
    attribute.options?.kw
      ? (data_title = slugify(attribute.options?.kw + "-" + modifiedData.title))
      : (data_title = slugify(modifiedData.title));
  }
  console.log("data_title", data_title);
  const generateSlug_by_Title = async () => {

    onChange({ target: { name, value: data_title, type: "text" } });
  };


  if (value == undefined) {
    generateSlug_by_Datetime();
  }
  if (attribute.options?.pattern == "title") {
    useEffect(() => {
      if (modifiedData.title) {
        generateSlug_by_Title();
      }
    }, [modifiedData.title]);
  } else if (attribute.options?.pattern == "id") {
    useEffect(() => {
      if (modifiedData.id) {
        generateSlug_by_Id();
      }
    }, [modifiedData.id]);
  }

  return (
    <Stack spacing={1}>
      <FieldLabel>{intlLabel?.defaultMessage}</FieldLabel>

      <FieldInput
        label="slug"
        name="slug"
        value={value || ""}
        onChange={(e) =>
          onChange({
            target: { name, value: slugify(e.target.value) },
          })
        }
        endAction={
          <Stack horizontal spacing={2}>
            <FieldActionWrapper
              onClick={() => generateSlug_by_Title()}
              label="regenerate"
            >
              <StrikeThrough />
            </FieldActionWrapper>
            <FieldActionWrapper onClick={() => generateSlug_by_Datetime()}>
              <Refresh />
            </FieldActionWrapper>
          </Stack>
        }
      />
    </Stack>
  );
};

export default Index;

export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }
  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
