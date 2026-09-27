"use client";

import { FormEvent, useMemo, useState } from "react";
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

  const groups = useMemo(() => {
    const map = new Map<string, ServiceSpec[]>();
    for (const spec of specs) {
      const key = spec.group || "مواصفات الطلب";
      map.set(key, [...(map.get(key) || []), spec]);
    }
    return Array.from(map.entries());
  }, [specs]);

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
        <span className="eyebrow">طلب عرض سعر</span>
        <h2>حدد ما تعرفه عن طلبك.</h2>
        <p>اختر المواصفات المتاحة لديك فقط. فريق رواج يراجع التفاصيل الفنية ويستكمل ما ينقص قبل إعداد العرض.</p>
      </div>

      <div className="configurator-groups">
        {groups.map(([group, groupSpecs]) => (
          <section className="configurator-group" key={group}>
            <div className="configurator-group-title">
              <strong>{group}</strong>
              <span>{groupSpecs.length} {groupSpecs.length === 1 ? "خيار" : "خيارات"}</span>
            </div>

            <div className="configurator-grid">
              {groupSpecs.map((spec) => (
                <label key={spec.key}>
                  <span>{spec.label}{spec.required ? " *" : ""}</span>

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

                  {spec.helpText && <small className="spec-help">{spec.helpText}</small>}
                </label>
              ))}
            </div>
          </section>
        ))}

        <label className="configurator-notes">
          <span>ملاحظات إضافية</span>
          <textarea
            maxLength={3000}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="موعد التسليم، موقع الاستخدام، لدي ملف جاهز، أحتاج التصميم، أو أي تفاصيل أخرى."
          />
        </label>
      </div>

      <div className="configurator-actions">
        <button className="btn btn-primary" type="submit">أضف إلى طلب عرض السعر</button>
        <small>لا يظهر أي سعر تلقائيًا؛ رواج تراجع المواصفات ثم تعد عرض السعر المناسب.</small>
      </div>
    </form>
  );
}
