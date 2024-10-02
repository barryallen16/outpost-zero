package com.phishingdetectionapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;

public class SmsBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "SmsBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        if ("android.provider.Telephony.SMS_RECEIVED".equals(intent.getAction())) {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                if (pdus != null) {
                    for (Object pdu : pdus) {
                        SmsMessage smsMessage = SmsMessage.createFromPdu((byte[]) pdu);
                        String messageBody = smsMessage.getMessageBody();
                        String sender = smsMessage.getOriginatingAddress();
                        
                        // Log and display the message
                        Log.d(TAG, "SMS received from: " + sender + ", message: " + messageBody);
                        Toast.makeText(context, "SMS received: " + messageBody, Toast.LENGTH_LONG).show();

                        // You can also send the message to your React Native code here if needed
                    }
                }
            }
        }
    }
}
