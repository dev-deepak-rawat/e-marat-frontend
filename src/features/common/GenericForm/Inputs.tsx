import { Input, Select, Switch } from "antd";
const { Option } = Select;

export const inputField = (placeholder: string) => {
    return <Input placeholder={placeholder} />;
};

type SelectFieldProps = {
    defaultValue: string;
    values: { value: string; label: string; }[];
}

export const SelectField = ({ defaultValue, values }: SelectFieldProps) => {
    return (
        <Select defaultValue={defaultValue} style={{ width: 120 }}>
            {values.map((value, index) => {
                return (
                    <Option value={value.value} key={index}>
                        {value.label}
                    </Option>
                );
            })}
        </Select>
    );
};

export const SwitchField = () => {
    return <Switch defaultChecked style={{ maxWidth: 50 }} />;
};
