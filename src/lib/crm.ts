type CrmPayload = {
  type: "request-demo" | "contact";
  submittedAt: string;
  data: Record<string, unknown>;
};

export async function submitToCrm(payload: CrmPayload) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info("CRM webhook not configured. Submission validated locally.", {
      type: payload.type,
      submittedAt: payload.submittedAt
    });
    return { delivered: false };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.CRM_API_KEY ? { authorization: `Bearer ${process.env.CRM_API_KEY}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("CRM submission failed.");
  }

  return { delivered: true };
}
