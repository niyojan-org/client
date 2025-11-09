<<<<<<< Updated upstream
"use client";

import { useContactForm } from "./hooks/useContactForm";
import { ContactFormComponent } from "./components/ContactFormComponent";
import { SuccessModal } from "./components/SuccessModal";
import { ContactMethods } from "./components/ContactMethods";

const Contact02Page = () => {
  const {
    formData,
    files,
    loading,
    success,
    errors,
    submittedData,
    handleChange,
    handleFileChange,
    removeFile,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 my-auto h-full items-center justify-center">
      {/* Intro text */}
      {/* <p className="text-base sm:text-lg text-muted-foreground text-center lg:text-left">
        We&apos;d love to hear from you. Please fill out this form or shoot us
        an email.
      </p> */}

      {/* Grid with methods & form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 items-center">
        {/* Contact Methods */}
        <ContactMethods />

        {/* Contact Form */}
        <ContactFormComponent
          formData={formData}
          files={files}
          loading={loading}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onRemoveFile={removeFile}
        />
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={success}
        onClose={resetForm}
        data={submittedData}
        onSendAnother={resetForm}
      />
    </div>
  );
};

export default Contact02Page;
=======
"use client";

import { useContactForm } from "./hooks/useContactForm";
import { ContactFormComponent } from "./components/ContactFormComponent";
import { SuccessModal } from "./components/SuccessModal";
import { ContactMethods } from "./components/ContactMethods";

const Contact02Page = () => {
  const {
    formData,
    files,
    loading,
    success,
    errors,
    submittedData,
    handleChange,
    handleFileChange,
    removeFile,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 my-auto h-full pb-10">
      {/* Intro text */}
      {/* <p className="text-base sm:text-lg text-muted-foreground text-center lg:text-left">
        We&apos;d love to hear from you. Please fill out this form or shoot us
        an email.
      </p> */}

      {/* Grid with methods & form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 items-center">
        {/* Contact Methods */}
        <ContactMethods />

        {/* Contact Form */}
        <ContactFormComponent
          formData={formData}
          files={files}
          loading={loading}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onRemoveFile={removeFile}
        />
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={success}
        onClose={resetForm}
        data={submittedData}
        onSendAnother={resetForm}
      />
    </div>
  );
};

export default Contact02Page;
>>>>>>> Stashed changes
