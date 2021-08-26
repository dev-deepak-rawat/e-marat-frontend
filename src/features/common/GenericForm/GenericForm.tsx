/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, Checkbox, Select, Button } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FORM_TYPES, ROLES } from 'lib/constants';
import { apiRequest } from 'app/apiRequest';
import { FieldType, FormMetaType } from 'app/declarations';
import { useAuth, useOrientation } from 'app/hooks';
import styled from 'styled-components';
import tw from 'twin.macro';
const { Option } = Select;

export const Error = styled.div`
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
            layout={isMobile ? 'horizontal' : 'inline'}
            size="large"
        >
            {
                fieldsData.map((field) => {
                    const {
                        type,
                        name: fieldName,
                        defaultValue,
                        options = [],
                        validations = {},
                        role,
                        placeholder = '',
                        label,
                    } = field;

                    if (role) {
                        if (isAdmin && role !== ROLES.ADMIN) return;
                        if (!isAdmin && role === ROLES.ADMIN) return;
                    }

                    switch (type) {
                        case FORM_TYPES.TEXT:
                        case FORM_TYPES.TEL:
                            return (
                                <Form.Item key={fieldName} label={label}>
                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        defaultValue={defaultValue}
                                        rules={validations}
                                        render={({ field }) => <Input placeholder={label} {...field} />}
                                    />

                                    {errors[fieldName] && (
                                        <Error>{errors[fieldName].message}</Error>
                                    )}
                                </Form.Item>
                            );

                        case FORM_TYPES.SELECT:
                            return (
                                <Form.Item key={fieldName} label={label}>
                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        defaultValue={defaultValue}
                                        rules={validations}
                                        render={({ field }) => (
                                            <Select
                                                placeholder={label}
                                                style={{ width: 200 }}
                                                {...field} >
                                                {options.map((op) => (
                                            <Option key={op.value} value={op.value}>
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
                                <Form.Item key={fieldName} >
                                    <Controller
                                        name={fieldName}
                                        control={control}
                                        rules={validations}
                                        render={({ field }) => <Checkbox defaultChecked={defaultValue} {...field} >{label}</Checkbox>}
                                    />

                                    {errors[fieldName] && (
                                        <Error>{errors[fieldName].message}</Error>
                                    )}
                                </Form.Item>
                            )
                    }
                    return null;
                })
            }
            < Button style={{ textTransform: 'capitalize' }
            } type="primary" loading={disable} htmlType="submit" >
                {submitLabel}
            </Button >
        </Form >
    );
}
