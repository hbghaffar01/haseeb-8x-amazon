import { useId, useState } from "react";
import { INPUT_KINDS, sanitizeByKind } from "../../../validation/schemas.js";
import "./Input.css";

/**
 * Reusable, SECURE input.
 *
 * - `kind` restricts allowed characters as the user types:
 *     "text"   -> letters, numbers, spaces and safe punctuation only
 *     "number" -> digits only
 *   Disallowed characters are stripped before they ever reach state.
 * - Optional `schema` (a Zod schema) validates the sanitized value and surfaces
 *   an inline error. External `error` prop still wins if provided.
 *
 * This hardening blocks injection-style input (angle brackets, quotes, etc.)
 * at the component boundary; the server validates again with the same rules.
 */
export function Input({
  label,
  error: externalError,
  value,
  onChange,
  kind = INPUT_KINDS.TEXT,
  schema,
  placeholder,
  ...rest
}) {
  const id = useId();
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => {
    const clean = sanitizeByKind(e.target.value, kind);

    if (schema) {
      const result = schema.safeParse(
        kind === INPUT_KINDS.NUMBER ? Number(clean || 0) : clean
      );
      setLocalError(result.success ? null : result.error.issues[0]?.message);
    }

    // Hand the sanitized value back to the caller.
    onChange?.({ ...e, target: { ...e.target, value: clean } });
  };

  const error = externalError || localError;
  // HTML inputmode improves mobile keyboards and signals intent.
  const inputMode = kind === INPUT_KINDS.NUMBER ? "numeric" : "text";

  return (
    <div className="ui-input-wrap">
      {label && (
        <label className="ui-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`ui-input ${error ? "ui-input--error" : ""}`}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <span className="ui-input-error">{error}</span>}
    </div>
  );
}
