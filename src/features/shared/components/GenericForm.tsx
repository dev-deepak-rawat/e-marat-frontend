/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, Checkbox, Select, Button } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FORM_TYPES, ROLES } from 'lib/constants';
import { apiRequest } from 'config/apiRequest';
import { useAuth, useOrientation } from 'config/hooks';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FieldType, FormMetaType } from 'lib/types';

const { Option } = Select;

const FormTitle = styled.p`
	${tw`
        text-xl
        my-2
        ml-20
        mb-8
    `}
`;

const Error = styled.div`
	${tw`
        text-red-500
        font-semibold
        mt-1
    `}
`;

type PropsType = {
    formData: {
        fieldsData: FieldType[];
        meta: FormMetaType;
    };
    submitHandler?: (data: any) => Promise<void>;
};

GenericForm.defaultProps = {
    submitHandler: null,
};

export default function GenericForm(props: PropsType) {
    const { isAdmin } = useAuth();
    const [disable, setDisable] = useState(false);
    const { isMobile } = useOrientation();
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<any>();

    const { formData, submitHandler } = props;
    const { fieldsData = [], meta = {} } = formData;
    const { submitLabel = 'submit', apiUrl } = meta;

    const onSubmit: SubmitHandler<any> = async (data) => {
        setDisable(true);
        if (submitHandler) {
            await submitHandler(data);
        } else if (apiUrl) {
            await apiRequest({ apiUrl, data });
        }
        setDisable(false);
    };

    return (
        <Form
            onFinish={handleSubmit(onSubmit)}
            layout="horizontal"
            size="large"
            labelCol={{
                span: 3,
                offset: 1,
            }}
            wrapperCol={{
                span: 12,
            }}
            requiredMark
            style={{
                marginLeft: '20%',
            }}

            initialValues={{
                firstName: 'ab',
            }}
        >
            <FormTitle>User Details</FormTitle>
            {fieldsData.map((fieldData) => {
                const {
                    type,
                    name: fieldName,
                    defaultValue,
                    options = [],
                    validations = {},
                    role,
                    label,
                } = fieldData;

                const required = Boolean(validations.required?.value);

                if (role) {
                    if (isAdmin && role !== ROLES.ADMIN) return;
                    if (!isAdmin && role === ROLES.ADMIN) return;
                }

                switch (type) {
                    case FORM_TYPES.TEXT:
                        return (
                            <Form.Item
                                key={fieldName}
                                label={label}
                                required={required}
                            >
                                <Controller
                                    name={fieldName}
                                    control={control}
                                    rules={validations}
                                    render={({ field }) => (
                                        <Input
                                            placeholder={label}
                                            defaultValue={defaultValue}
                                            {...field}
                                        />
                                    )}
                                />

                                {errors[fieldName] && (
                                    <Error>{errors[fieldName].message}</Error>
                                )}
                            </Form.Item>
                        );

                    case FORM_TYPES.SELECT:
                        return (
                            <Form.Item
                                key={fieldName}
                                label={label}
                                required={required}
                            >
                                <Controller
                                    name={fieldName}
                                    control={control}
                                    defaultValue={defaultValue}
                                    rules={validations}
                                    render={({ field }) => (
                                        <Select
                                            placeholder={label}
                                            style={{ width: 200 }}
                                            {...field}
                                        >
                                            {options.map((op) => (
                                                <Option
                                                    key={op.value}
                                                    value={op.value}
                                                >
                                                    {op.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors[fieldName] && (
                                    <Error>{errors[fieldName].message}</Error>
                                )}
                            </Form.Item>
                        );

                    case FORM_TYPES.CHECKBOX:
                        return (
                            <Form.Item
                                key={fieldName}
                                label={label}
                                required={required}
                                valuePropName="checked"
                            >
                                <Controller
                                    name={fieldName}
                                    control={control}
                                    rules={validations}

                                    render={({ field }) => (
                                        <Checkbox
                                            defaultChecked={defaultValue}
                                            {...field}
                                        />
                                    )}
                                />

                                {errors[fieldName] && (
                                    <Error>{errors[fieldName].message}</Error>
                                )}
                            </Form.Item>
                        );
                }
                return null;
            })}
            <Button
                style={{
                    textTransform: 'capitalize',
                    marginLeft: isMobile ? 0 : '10%',
                }}
                type="primary"
                loading={disable}
                htmlType="submit"
            >
                {submitLabel}
            </Button>
        </Form>
    );
}
