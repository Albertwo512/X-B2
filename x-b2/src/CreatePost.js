import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';


const CollectionCreateForm = ({ initialValues, onFormInstanceReady }) => {

    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    },);
    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <Form.Item
                name="title"
                label="Title"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input type="textarea" />
            </Form.Item>
            <Form.Item name="modifier" className="collection-create-form_last-form-item">
                <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};
const CollectionCreateFormModal = ({ open, onCreate, onCancel, initialValues }) => {
    const [formInstance, setFormInstance] = useState();
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            onOk={async () => {
                try {
                    const values = await formInstance?.validateFields();
                    formInstance?.resetFields();
                    onCreate(values);
                } catch (error) {
                    console.log('Failed:', error);
                }
            }}
        >
            <CollectionCreateForm
                initialValues={initialValues}
                onFormInstanceReady={(instance) => {
                    setFormInstance(instance);
                }}
            />
        </Modal>
    );
};
export const Post = () => {
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Create Post
            </Button>
            <pre>{JSON.stringify(formValues, null, 2)}</pre>
            <CollectionCreateFormModal
                open={open}
                onCreate={onCreate}
                onCancel={() => setOpen(false)}
                initialValues={{
                    modifier: 'public',
                }}
            />
        </>
    );
};