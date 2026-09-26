"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { ServiceSpec } from "@/lib/service-specs";

export default function ServiceConfigurator({
  id,
  title,
  specs
}: {
  id: string;
  title: string;
  specs: ServiceSpec[];
}) {
  const { addItem } = useCart();
  const [values, setValues] = useState<Record<string,string>>({});
  const [notes, setNotes] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const selected = specs
      .map((spec) => {
        const value = values[spec.key]?.trim();
        if (!value) return null;
        return spec.label + ": " + value + (spec.unit ? " " + spec.unit : "");
      })
      .filter(Boolean);

    if (notes.trim()) selected.push("ملاحظات: " + notes.trim());
    addItem({ id, title, specs: selected.join(" • ") || undefined });
  }

  return (
    <form className="service-configurator" onSubmit={submit}>
      <div className="configurator-head">
        <span className="eyebrow">خصّص طلبك</span>
        <h2>حدد ما تعرفه الآن.</h2>
        <p>كل الحقول اختيارية. الهدف أن ترسل لرواج وصفًا أوضح، لا أن تتحول أنت إلى فني طباعة.</p>
      </div>

      <div className="configurator-grid">
        {specs.map((spec) => (
          <label key={spec.key}>
            <span>{spec.label}</span>
            {spec.type === "select" ? (
              <select
                value={values[spec.key] || ""}
                onChange={(event) => setValues({ ...values, [spec.key]: event.target.value })}
              >
                <option value="">اختر — اختياري</option>
                {spec.options?.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            ) : (
              <div className="input-with-unit">
                <input
                  type={spec.type}
                  value={values[spec.key] || ""}
                  onChange={(event) => setValues({ ...values, [spec.key]: event.target.value })}
                  placeholder={spec.placeholder}
                  min={spec.type === "number" ? 1 : undefined}
                />
                {spec.unit && <small>{spec.unit}</small>}
              </div>
            )}
          </label>
        ))}

        <label className="configurator-notes">
          <span>ملاحظات إضافية</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="موعد التسليم، لون محدد، لدي ملف جاهز، أحتاج التصميم... إلخ"
          />
        </label>
      </div>

      <div className="configurator-actions">
        <button className="btn btn-primary" type="submit">أضف الخدمة بالمواصفات</button>
        <small>يمكنك تعديل التفاصيل النهائية مع فريق رواج عبر واتساب بعد إرسال السلة.</small>
      </div>
    </form>
  );
}
