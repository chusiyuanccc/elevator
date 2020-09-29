/*! CITIZEN XML Label API v1.01(2018-09-12)  Copyright(C) 2015-2018 CITIZEN SYSTEMS JAPAN CO.,LTD. */
(function(aa) {
  var ba = 101;
  var ca = '1.01';
  var da = 30000;
  var ea = function(s) {
    var fa = /[<>&'"\t\n\r]/g;
    if (fa.test(s)) {
      s = s.replace(fa, function(c) {
        var r = "";
        switch (c) {
          case "<":
            r = "&lt;";
            break;
          case ">":
            r = "&gt;";
            break;
          case "&":
            r = "&amp;";
            break;
          case "'":
            r = "&apos;";
            break;
          case '"':
            r = "&quot;";
            break;
          case "\t":
            r = "&#9;";
            break;
          case "\n":
            r = "&#10;";
            break;
          case "\r":
            r = "&#13;";
            break;
          default:
            break;
        }
        return r;
      });
    }
    return s;
  };
  var ga = function(s) {
    var ha = /[\\\x00-\x1f\x7f-\xff]/g;
    if (ha.test(s)) {
      s = s.replace(ha, function(c) {
        return (c == "\\") ? "\\\\" : "\\x" + ("0" + c.charCodeAt(0).toString(16)).slice(-2);
      });
    }
    return s;
  };
  var ia = function(ja) {
    throw new Error(ja + ' Element is invalid');
  };
  var ka = function(la, ma, na) {
    if (!na.test(ma)) {
      throw new Error('Parameter "' + la + '" is invalid');
    }
    return ma;
  };
  var oa = function(pa, qa, ra, sa) {
    if (isNaN(qa) || qa < ra || qa > sa) {
      throw new Error('Parameter "' + pa + '" is invalid');
    }
    return qa;
  };
  var ta = function(ua, va) {
    return oa(ua, va, 0, 255);
  };
  var wa = function(xa, ya) {
    return oa(xa, ya, 0, 65535);
  };
  var za = function(Aa, Ba) {
    return oa(Aa, Ba, -32768, 32767);
  };
  var Ca = function(Da, Ea) {
    return oa(Da, Ea, 0, 4294967295);
  };
  var Fa = function(Ga, Ha) {
    if (!Ga) {
      return Ga;
    }
    Ga = Ga.replace(/></g, function(Ia, Ja, s) {
      var ch = s.substr(Ja, 8);
      if (ch == '></Data>' || ch == '></Reque') {
        return Ia;
      } else {
        return ">\n<";
      }
    });
    Ga = Ga.replace(/<s:Body>/g, " <s:Body>");
    Ga = Ga.replace(/<\/s:Body>/g, " </s:Body>");
    if (Ha == 0) {
      Ga = Ga.replace(/<POSPrinterRequest/g, "  <POSPrinterRequest");
      Ga = Ga.replace(/<\/POSPrinterRequest>/g, "  </POSPrinterRequest>");
      var Ka = ["<SendData>", "</SendData>", "<SetEncoding>", "</SetEncoding>", "<GetDeviceInfo", "<MessageID>"];
      for (var i = 0, len = Ka.length; i < len; i++) {
        Ga = Ga.replace(new RegExp(Ka[i], 'g'), "   " + Ka[i]);
      }
      var La = ["<Data>", "<Encode>"];
      for (var i = 0, len = La.length; i < len; i++) {
        Ga = Ga.replace(new RegExp(La[i], 'g'), "    " + La[i]);
      }
    } else {
      Ga = Ga.replace(/<POSPrinterResponse/g, "  <POSPrinterResponse");
      Ga = Ga.replace(/<\/POSPrinterResponse>/g, "  </POSPrinterResponse>");
      var Ka = ["<Response", "</Response>", "<GetDeviceInfo>", "</GetDeviceInfo>", "<MessageID>"];
      for (var i = 0, len = Ka.length; i < len; i++) {
        Ga = Ga.replace(new RegExp(Ka[i], 'g'), "   " + Ka[i]);
      }
      var La = ["<RequestID>", "<BusinessError", "</BusinessError>", "<Device "];
      for (var i = 0, len = La.length; i < len; i++) {
        Ga = Ga.replace(new RegExp(La[i], 'g'), "    " + La[i]);
      }
      var Ma = ["<Code>", "<Description>"];
      for (var i = 0, len = Ma.length; i < len; i++) {
        Ga = Ga.replace(new RegExp(Ma[i], 'g'), "     " + Ma[i]);
      }
    }
    return Ga;
  };
  var Na = function(Oa) {
    Oa =
      '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' +
      Oa + '</s:Body></s:Envelope>';
    return Oa;
  };
  var Pa = function(Qa) {
    Qa = '<POSPrinterRequest xmlns="http://www.citizen.co.jp/POSPrinter/" MajorVersion="1">' + Qa +
      "</POSPrinterRequest>";
    return Qa;
  };
  var Ra = function() {
    var Sa = null;
    if (aa.XMLHttpRequest) {
      Sa = new XMLHttpRequest();
    } else if (aa.ActiveXObject) {
      try {
        Sa = new ActiveXObject("msxml2.XMLHTTP");
      } catch (e) {
        Sa = new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    return Sa;
  };
  var Ta = function(Ua) {
    if ((typeof(Ua.text) != "undefined") && (Ua.text != null)) {
      return Ua.text;
    } else if ((typeof(Ua.textContent) != "undefined") && (Ua.textContent != null)) {
      return Ua.textContent;
    } else {
      if (Ua.firstChild != null) {
        return Ua.firstChild.nodeValue;
      } else {
        return "";
      }
    }
  };
  var Va = function(Wa, Xa, Ya, Za, $a, ab, bb, cb, db) {
    if (Wa.OnReceive) {
      var eb = Fa(db, 1);
      Wa.OnReceive({
        MajorVersion: Xa,
        MessageID: Ya,
        ResponseCode: Za,
        RequestID: $a,
        ErrorCode: ab,
        Description: bb,
        DeviceInfo: cb
      }, eb);
    }
  };
  var fb = function(gb, hb, ib) {
    if (gb.OnError) {
      gb.OnError({
        status: hb,
        responseText: ib
      });
    }
  };
  var jb = function(kb, lb, mb) {
    var nb;
    var ob;
    var pb;
    var qb = 0;
    var rb = "";
    var tb = "";
    var ub = "";
    var vb = "";
    var wb = "";
    var xb = "";
    var yb = new Array();
    var zb = "";
    var Ab = "";
    var Bb = "";
    if (!lb) {
      Va(kb, '', '', '', '', '', '', 'Response data is null.', yb, ImageInfo);
      return;
    }
    nb = lb.getElementsByTagName("POSPrinterResponse");
    if (nb.length == 0) {
      Va(kb, '', '', '', '', '', '', 'POSPrinterResponse is not.', yb, ImageInfo);
      return;
    }
    qb = nb[0].getAttribute("MajorVersion");
    if (nb[0].getElementsByTagName("MessageID").length != 0) {
      rb = Ta(nb[0].getElementsByTagName("MessageID")[0]);
    }
    ob = nb[0].getElementsByTagName("Response")[0];
    tb = ob.getAttribute("ResponseCode");
    ub = Ta(ob.getElementsByTagName("RequestID")[0]);
    if (tb == "Rejected") {
      if (ob.getElementsByTagName("BusinessError").length != 0) {
        pb = ob.getElementsByTagName("BusinessError")[0];
        if (pb.getAttribute("Severity").length != 0) {
          vb = pb.getAttribute("Severity");
        }
        if (pb.getElementsByTagName("Code").length != 0) {
          wb = Ta(pb.getElementsByTagName("Code")[0]);
        }
        if (pb.getElementsByTagName("Description").length != 0) {
          xb = Ta(pb.getElementsByTagName("Description")[0]);
        }
      }
    }
    if (nb[0].getElementsByTagName("GetDeviceInfo").length != 0) {
      ob = nb[0].getElementsByTagName("GetDeviceInfo")[0];
      var Cb = ob.getElementsByTagName("Device").length;
      if (Cb != 0) {
        for (i = 0; i < Cb; i++) {
          zb = ob.getElementsByTagName("Device")[i].getAttribute("Name");
          Ab = ob.getElementsByTagName("Device")[i].getAttribute("Status");
          Bb = ob.getElementsByTagName("Device")[i].getAttribute("BarcodePrinterStatus");
          yb.push({
            name: zb,
            status: Ab,
            BarcodePrinterStatus: Bb
          });
        }
      }
    }
    Va(kb, qb, rb, tb, ub, wb, xb, yb, mb);
  };
  var Db = (function() {
    var Db = function() {
      this.mg = "";
      this.iTO = da;
      this.sAD = "";
    };
    var Eb = Db.prototype;
    Eb.add = function(Fb) {
      this.mg += Fb;
    };
    Eb.get = function() {
      var Gb = this.mg;
      Gb = Pa(Gb);
      Gb = Na(Gb);
      return Gb;
    };
    return Db;
  })();
  var Hb = function(Ib, Jb, Kb) {
    var Lb = Ib.p;
    var Mb = Ra();
    Mb.open("POST", Jb, true);
    Mb.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
    Mb.setRequestHeader("SOAPAction", '""');
    Mb.onreadystatechange = function() {
      if (Mb.readyState == 4) {
        var Nb = Mb.status;
        var Ob = Mb.responseXML;
        var Pb = Mb.responseText;
        if (Nb == 200) {
          jb(Ib, Ob, Pb);
        } else {
          fb(Ib, Nb, Pb);
        }
      }
    };
    if (Mb.timeout != undefined) Mb.timeout = Lb.iTO;
    Mb.send(Kb);
  };

  function CXMLLabel() {
    this.OnReceive = null;
    this.OnError = null;
    this.p = new Db();
  };
  CXMLLabel.prototype.Send = function(Qb) {
    var Rb = this;
    var Sb = Rb.p;
    var Tb = arguments.length;
    var Ub;
    if (Tb < 1) {
      throw new Error('Send Parameter is invalid');
    } else if (1 < Tb) {
      Ub = arguments[1];
    } else {
      Ub = Sb.get();
    }
    if (Qb == "") {
      throw new Error('Send Parameter is invalid');
    }
    Hb(Rb, Qb, Ub);
  };
  CXMLLabel.prototype.ToString = function() {
    var Vb = this.p;
    var Wb;
    Wb = Vb.get();
    Wb = Fa(Wb, 0);
    return Wb;
  };
  CXMLLabel.prototype.SendData = function(Xb, Yb) {
    var Zb = this.p;
    var $b = "";
    if (Yb != undefined) {
      $b += "<Encode>" + Yb + "</Encode>";
    }
    if (Xb != undefined) {
      $b += "<Data>" + ga(ea(Xb)) + "</Data>";
      $b = "<SendData>" + $b + "</SendData>";
      Zb.add($b);
    } else {
      ia('SendData');
    }
    return this;
  };
  CXMLLabel.prototype.MessageID = function(ac) {
    var bc = this.p;
    var cc;
    if (ac != undefined) {
      cc = "<MessageID>" + ac + "</MessageID>";
      bc.add(cc);
    } else {
      ia('MessageID');
    }
    return this;
  };
  CXMLLabel.prototype.GetDeviceInfo = function(fc, gc, hc) {
    var ic = this.p;
    var jc = "";
    if (fc) {
      jc += " Name='" + fc + "'";
    }
    if (gc) {
      if (gc == true) {
        gc = 'true';
      }
      jc += " Status='" + gc + "'";
    }
    if (hc) {
      if (hc == true) {
        hc = 'true';
      }
      jc += " BarcodePrinterStatus='" + gc + "'";
    }
    jc = "<GetDeviceInfo" + jc + " />";
    ic.add(jc);
    return this;
  };
  CXMLLabel.prototype.SetEncoding = function(kc) {
    var lc = this.p;
    var mc = "";
    if (kc != undefined) {
      mc += "<Encode>" + kc + "</Encode>";
      mc = "<SetEncoding>" + mc + "</SetEncoding>";
      lc.add(mc);
    } else {
      ia('SetEncoding');
    }
    return this;
  };
  CXMLLabel.prototype.GetVersionCode = function() {
    return ba;
  };
  CXMLLabel.prototype.GetVersionName = function() {
    return ca;
  };
  if (!aa.citizen) {
    aa.citizen = {};
  }
  aa.citizen.CXMLLabel = CXMLLabel;
})(window);
(function(nc) {
  var oc = {
    CLS_PROPERTY_DEFAULT: 999999,
    CLS_SUCCESS: 0,
    CLS_E_CONNECTED: 1001,
    CLS_E_DISCONNECT: 1002,
    CLS_E_NOTCONNECT: 1003,
    CLS_E_CONNECT_NOTFOUND: 1004,
    CLS_E_ILLEGAL: 1101,
    CLS_E_OFFLINE: 1102,
    CLS_E_NOEXIST: 1103,
    CLS_E_FAILURE: 1104,
    CLS_E_TIMEOUT: 1105,
    CLS_EPTR_BADFORMAT: 1203,
    CLS_STS_NO: 0,
    CLS_STS_YES: 1,
    CLS_LOCALE_JP: 0,
    CLS_LOCALE_OTHER: 1,
    CLS_LOCALE_CN: 2,
    CLS_LOCALE_KR: 3,
    CLS_PRT_FNT_0: 0,
    CLS_PRT_FNT_1: 1,
    CLS_PRT_FNT_2: 2,
    CLS_PRT_FNT_3: 3,
    CLS_PRT_FNT_4: 4,
    CLS_PRT_FNT_5: 5,
    CLS_PRT_FNT_6: 6,
    CLS_PRT_FNT_7: 7,
    CLS_PRT_FNT_8: 8,
    CLS_PRT_FNT_TRIUMVIRATE: 9,
    CLS_PRT_FNT_TRIUMVIRATE_B: 10,
    CLS_PRT_FNT_KANJI: 11,
    CLS_PRT_FNT_KANJIT: 12,
    CLS_PRT_FNT_SIZE_4: 0,
    CLS_PRT_FNT_SIZE_5: 1,
    CLS_PRT_FNT_SIZE_6: 2,
    CLS_PRT_FNT_SIZE_8: 3,
    CLS_PRT_FNT_SIZE_10: 4,
    CLS_PRT_FNT_SIZE_12: 5,
    CLS_PRT_FNT_SIZE_14: 6,
    CLS_PRT_FNT_SIZE_18: 7,
    CLS_PRT_FNT_SIZE_24: 8,
    CLS_PRT_FNT_SIZE_30: 9,
    CLS_PRT_FNT_SIZE_36: 10,
    CLS_PRT_FNT_SIZE_48: 11,
    CLS_PRT_FNT_KANJI_SIZE_16: 100,
    CLS_PRT_FNT_KANJI_SIZE_24: 101,
    CLS_PRT_FNT_KANJI_SIZE_32: 102,
    CLS_PRT_FNT_KANJI_SIZE_48: 103,
    CLS_ENC_CDPG_DEFAULT: 0,
    CLS_ENC_CDPG_IBM037: 37,
    CLS_ENC_CDPG_IBM437: 437,
    CLS_ENC_CDPG_IBM500: 500,
    CLS_ENC_CDPG_IBM737: 737,
    CLS_ENC_CDPG_IBM775: 775,
    CLS_ENC_CDPG_IBM850: 850,
    CLS_ENC_CDPG_IBM852: 852,
    CLS_ENC_CDPG_IBM855: 855,
    CLS_ENC_CDPG_IBM857: 857,
    CLS_ENC_CDPG_IBM860: 860,
    CLS_ENC_CDPG_IBM861: 861,
    CLS_ENC_CDPG_IBM863: 863,
    CLS_ENC_CDPG_IBM864: 864,
    CLS_ENC_CDPG_IBM865: 865,
    CLS_ENC_CDPG_CP866: 866,
    CLS_ENC_CDPG_IBM869: 869,
    CLS_ENC_CDPG_WINDOWS_874: 874,
    CLS_ENC_CDPG_CP875: 875,
    CLS_ENC_CDPG_SHIFT_JIS: 932,
    CLS_ENC_CDPG_GB2312: 936,
    CLS_ENC_CDPG_KS_C_5601_1987: 949,
    CLS_ENC_CDPG_BIG5: 950,
    CLS_ENC_CDPG_IBM1026: 1026,
    CLS_ENC_CDPG_UTF_16: 1200,
    CLS_ENC_CDPG_UNICODEFFFE: 1201,
    CLS_ENC_CDPG_WINDOWS_1250: 1250,
    CLS_ENC_CDPG_WINDOWS_1251: 1251,
    CLS_ENC_CDPG_WINDOWS_1252: 1252,
    CLS_ENC_CDPG_WINDOWS_1253: 1253,
    CLS_ENC_CDPG_WINDOWS_1254: 1254,
    CLS_ENC_CDPG_WINDOWS_1255: 1255,
    CLS_ENC_CDPG_WINDOWS_1256: 1256,
    CLS_ENC_CDPG_WINDOWS_1257: 1257,
    CLS_ENC_CDPG_WINDOWS_1258: 1258,
    CLS_ENC_CDPG_JOHAB: 1361,
    CLS_ENC_CDPG_MACINTOSH: 10000,
    CLS_ENC_CDPG_X_MAC_JAPANESE: 10001,
    CLS_ENC_CDPG_X_MAC_CHINESETRAD: 10002,
    CLS_ENC_CDPG_X_MAC_KOREAN: 10003,
    CLS_ENC_CDPG_X_MAC_GREEK: 10006,
    CLS_ENC_CDPG_X_MAC_CYRILLIC: 10007,
    CLS_ENC_CDPG_X_MAC_CHINESESIMP: 10008,
    CLS_ENC_CDPG_X_MAC_ROMANIAN: 10010,
    CLS_ENC_CDPG_X_MAC_UKRAINIAN: 10017,
    CLS_ENC_CDPG_X_MAC_CE: 10029,
    CLS_ENC_CDPG_X_MAC_ICELANDIC: 10079,
    CLS_ENC_CDPG_X_MAC_TURKISH: 10081,
    CLS_ENC_CDPG_X_MAC_CROATIAN: 10082,
    CLS_ENC_CDPG_X_CHINESE_CNS: 20000,
    CLS_ENC_CDPG_US_ASCII: 20127,
    CLS_ENC_CDPG_X_CP20261: 20261,
    CLS_ENC_CDPG_IBM290: 20290,
    CLS_ENC_CDPG_KOI8_R: 20866,
    CLS_ENC_CDPG_EUC_JP_JIS: 20932,
    CLS_ENC_CDPG_X_CP20936: 20936,
    CLS_ENC_CDPG_X_CP20949: 20949,
    CLS_ENC_CDPG_X_CP21027: 21027,
    CLS_ENC_CDPG_KOI8_U: 21866,
    CLS_ENC_CDPG_ISO_8859_1: 28591,
    CLS_ENC_CDPG_ISO_8859_2: 28592,
    CLS_ENC_CDPG_ISO_8859_4: 28594,
    CLS_ENC_CDPG_ISO_8859_5: 28595,
    CLS_ENC_CDPG_ISO_8859_7: 28597,
    CLS_ENC_CDPG_ISO_8859_9: 28599,
    CLS_ENC_CDPG_ISO_8859_13: 28603,
    CLS_ENC_CDPG_ISO_8859_15: 28605,
    CLS_ENC_CDPG_ISO_2022_JP: 50220,
    CLS_ENC_CDPG_CSISO2022JP: 50221,
    CLS_ENC_CDPG_ISO_2022_JP_S: 50222,
    CLS_ENC_CDPG_ISO_2022_KR: 50225,
    CLS_ENC_CDPG_X_CP50227: 50227,
    CLS_ENC_CDPG_EUC_JP: 51932,
    CLS_ENC_CDPG_EUC_CN: 51936,
    CLS_ENC_CDPG_EUC_KR: 51949,
    CLS_ENC_CDPG_HZ_GB_2312: 52936,
    CLS_ENC_CDPG_GB18030: 54936,
    CLS_ENC_CDPG_UTF_7: 65000,
    CLS_ENC_CDPG_UTF_8: 65001,
    CLS_PRT_RES_203: 203,
    CLS_PRT_RES_300: 300,
    CLS_FNT_DEFAULT: 0,
    CLS_FNT_BOLD: 8,
    CLS_FNT_REVERSE: 16,
    CLS_FNT_UNDERLINE: 128,
    CLS_FNT_ITALIC: 256,
    CLS_FNT_STRIKEOUT: 512,
    CLS_RT_NORMAL: 1,
    CLS_RT_RIGHT90: 2,
    CLS_RT_ROTATE180: 3,
    CLS_RT_LEFT90: 4,
    CLS_BM_ASIS: -11,
    CLS_BCS_CODE39: 100,
    CLS_BCS_UPCA: 101,
    CLS_BCS_UPCE: 102,
    CLS_BCS_INTERLEAVED25: 103,
    CLS_BCS_CODE128: 104,
    CLS_BCS_EAN13: 105,
    CLS_BCS_EAN8: 106,
    CLS_BCS_HIBC: 107,
    CLS_BCS_CODABAR: 108,
    CLS_BCS_INT25: 109,
    CLS_BCS_PLESSEY: 110,
    CLS_BCS_CASECODE: 111,
    CLS_BCS_UPC2DIG: 112,
    CLS_BCS_UPC5DIG: 113,
    CLS_BCS_CODE93: 114,
    CLS_BCS_ITF14: 115,
    CLS_BCS_ZIP: 116,
    CLS_BCS_ITF16: 117,
    CLS_BCS_UCCEAN128: 118,
    CLS_BCS_INDUSTRIAL25: 119,
    CLS_BCS_UCCEAN128KMART: 120,
    CLS_BCS_COOP25: 121,
    CLS_BCS_UCCEAN128RANDOMWEIGHT: 122,
    CLS_BCS_TELEPEN: 123,
    CLS_BCS_TEXT_HIDE: 0,
    CLS_BCS_TEXT_SHOW: 1,
    CLS_DATAMATRIX_EC_LEVEL_200: 200,
    CLS_PDF417_EC_LEVEL_0: 0,
    CLS_PDF417_EC_LEVEL_1: 1,
    CLS_PDF417_EC_LEVEL_2: 2,
    CLS_PDF417_EC_LEVEL_3: 3,
    CLS_PDF417_EC_LEVEL_4: 4,
    CLS_PDF417_EC_LEVEL_5: 5,
    CLS_PDF417_EC_LEVEL_6: 6,
    CLS_PDF417_EC_LEVEL_7: 7,
    CLS_PDF417_EC_LEVEL_8: 8,
    CLS_QRCODE_EC_LEVEL_L: 0,
    CLS_QRCODE_EC_LEVEL_M: 1,
    CLS_QRCODE_EC_LEVEL_Q: 2,
    CLS_QRCODE_EC_LEVEL_H: 3,
    CLS_AXTEC_EC_LEVEL_000: 0,
    CLS_GS1_DATABAR_OMNI_DIRECTIONAL: 0,
    CLS_GS1_DATABAR_COMPOSITE: 1,
    CLS_GS1_DATABAR_TRUNCATION: 2,
    CLS_GS1_DATABAR_STACKED: 3,
    CLS_GS1_DATABAR_STACKED_OMNI_DIRECTIONAL: 4,
    CLS_GS1_DATABAR_LIMITED: 5,
    CLS_GS1_DATABAR_EXPANDED: 6,
    CLS_SHADED_PTN_0: 0,
    CLS_SHADED_PTN_1: 1,
    CLS_SHADED_PTN_2: 2,
    CLS_SHADED_PTN_3: 3,
    CLS_SHADED_PTN_4: 4,
    CLS_SHADED_PTN_5: 5,
    CLS_SHADED_PTN_6: 6,
    CLS_SHADED_PTN_7: 7,
    CLS_SHADED_PTN_8: 8,
    CLS_SHADED_PTN_9: 9,
    CLS_SHADED_PTN_10: 10,
    CLS_SHADED_PTN_11: 11,
    CLS_UNIT_MILLI: 0,
    CLS_UNIT_INCH: 1,
    CLS_SPEEDSETTING_1: 1,
    CLS_SPEEDSETTING_2: 2,
    CLS_SPEEDSETTING_3: 3,
    CLS_SPEEDSETTING_4: 4,
    CLS_SPEEDSETTING_5: 5,
    CLS_SPEEDSETTING_6: 6,
    CLS_SPEEDSETTING_7: 7,
    CLS_SPEEDSETTING_8: 8,
    CLS_SPEEDSETTING_9: 9,
    CLS_SPEEDSETTING_A: 10,
    CLS_SPEEDSETTING_B: 11,
    CLS_SPEEDSETTING_C: 12,
    CLS_SPEEDSETTING_D: 13,
    CLS_SPEEDSETTING_E: 14,
    CLS_SPEEDSETTING_F: 15,
    CLS_SPEEDSETTING_G: 16,
    CLS_SPEEDSETTING_H: 17,
    CLS_SPEEDSETTING_I: 18,
    CLS_SPEEDSETTING_J: 19,
    CLS_SPEEDSETTING_K: 20,
    CLS_SPEEDSETTING_L: 21,
    CLS_SPEEDSETTING_M: 22,
    CLS_SPEEDSETTING_N: 23,
    CLS_SPEEDSETTING_O: 24,
    CLS_SPEEDSETTING_P: 25,
    CLS_SPEEDSETTING_Q: 26,
    CLS_SPEEDSETTING_R: 27,
    CLS_SPEEDSETTING_S: 28,
    CLS_SPEEDSETTING_T: 29,
    CLS_SPEEDSETTING_U: 30,
    CLS_SPEEDSETTING_V: 31,
    CLS_SPEEDSETTING_W: 32,
    CLS_SPEEDSETTING_X: 33,
    CLS_MEDIAHANDLING_NONE: 0,
    CLS_MEDIAHANDLING_TEAROFF: 1,
    CLS_MEDIAHANDLING_DISPENSES: 2,
    CLS_MEDIAHANDLING_PAUSE: 3,
    CLS_MEDIAHANDLING_CUT: 4,
    CLS_MEDIAHANDLING_CUTANDPAUSE: 5,
    CLS_MEDIAHANDLING_PEELOFF: 6,
    CLS_MEDIAHANDLING_REWIND: 7,
    CLS_SELSENSOR_NONE: 0,
    CLS_SELSENSOR_SEETHROUGH: 1,
    CLS_SELSENSOR_REFLECT: 2,
    CLS_PRTMETHOD_TT: 0,
    CLS_PRTMETHOD_DT: 1,
    CLS_SENS_LOCATION_FRONT: 0,
    CLS_SENS_LOCATION_ADJUSTABLE: 1
  };
  var pc = 0;
  var qc = 1;
  var rc = 1;
  var tc = 2;
  var uc = 3;
  var vc = 4;
  var wc = 5;
  var xc = 8;
  var yc = 9;
  var zc = 10;
  var Ac = 11;
  var Bc = 12;
  var Cc = 13;
  var Dc = 14;
  var Ec = 15;
  var Fc = 16;
  var Gc = 17;
  var Hc = 18;
  var Ic = 19;
  var Jc = 20;
  var Kc = 21;
  var Lc = 22;
  var Mc = 23;
  var Nc = 24;
  var Oc = 25;
  var Pc = 26;
  var Qc = 27;
  var Rc = 28;
  var Sc = 29;
  var Tc = 30;
  var Uc = 1;
  var Vc = 2;
  var Wc = 27;
  var FS = 28;
  var GS = 29;
  var HT = 9;
  var LF = 10;
  var FF = 12;
  var CR = 13;
  var Xc = 24;
  var Yc = 16;
  var Zc = 4;
  var $c = 5;
  var ad = 17;
  var bd = 19;
  var cd = 20;
  var RS = 30;
  var SP = 32;
  var dd = 9999;
  var ed = 9999;
  var fd = 398;
  var gd = 3;
  var hd = 9999;
  var jd = 24;
  var kd = 16;
  var ld = 24;
  var md = 999;
  var nd = 0;
  var od = 1;
  var pd = {
    Dots203: 1,
    Twips: 2,
    English: 3,
    Metric: 4,
    Dots300: 5,
    Dots92: 6
  };
  var qd = function(rd, sd, td) {
    var ud = [2032, 14400, 1000, 2540, 3000, 920];
    var vd = td;
    var wd = rd - 1;
    var to = sd - 1;
    if (wd == to) {
      return vd;
    } else {
      vd = vd * ud[to] / ud[wd];
      vd = Math.round(vd);
      return vd;
    }
  };
  var xd = function(yd) {
    var zd = '';
    if ((0 <= yd) && (yd <= 9)) {
      zd += yd;
    } else {
      switch (yd) {
        case 10:
          zd = "A";
          break;
        case 11:
          zd = "B";
          break;
        case 12:
          zd = "C";
          break;
        case 13:
          zd = "D";
          break;
        case 14:
          zd = "E";
          break;
        case 15:
          zd = "F";
          break;
        case 16:
          zd = "G";
          break;
        case 17:
          zd = "H";
          break;
        case 18:
          zd = "I";
          break;
        case 19:
          zd = "J";
          break;
        case 20:
          zd = "K";
          break;
        case 21:
          zd = "L";
          break;
        case 22:
          zd = "M";
          break;
        case 23:
          zd = "N";
          break;
        case 24:
          zd = "O";
          break;
        case 25:
          zd = "P";
          break;
        case 26:
          zd = "Q";
          break;
        case 27:
          zd = "R";
          break;
        case 28:
          zd = "S";
          break;
        case 29:
          zd = "T";
          break;
        case 30:
          zd = "U";
          break;
        case 31:
          zd = "V";
          break;
        case 32:
          zd = "W";
          break;
        case 33:
          zd = "X";
          break;
        default:
          zd = "";
          break;
      }
    }
    return zd;
  };
  var Ad = function(Bd, Cd) {
    var Dd = "" + Bd;
    if (Dd.length > Cd.length) {
      return Dd;
    }
    var Ed = -Cd.length;
    var Fd = (Cd + Bd).slice(Ed);
    return Fd;
  };
  var Gd = function(Hd) {
    return (new Uint8Array([].map.call(Hd, function(c) {
      return c.charCodeAt(0);
    }))).buffer;
  };
  var Id = function(Jd) {
    var Kd = [];
    if (Jd == null || Jd.length == 0) {
      return new Uint8Array(0);
    }
    for (var i = 0; i < Jd.length; i++) {
      var Ld = Jd.charCodeAt(i);
      if (0xD800 <= Ld && Ld <= 0xDFFF) {
        var Md = Ld;
        var Nd = str.charCodeAt(i++);
        Ld = 0x10000 + (Md - 0xD800) * 0x400 + (Nd - 0xDC00);
      }
      if (Ld <= 0x7F) {
        Kd.push(Ld);
      } else if (Ld <= 0x07FF) {
        Kd.push(0xC0 | (Ld >>> 6));
        Kd.push(0x80 | (Ld & 0x3F));
      } else if (Ld <= 0xFFFF) {
        Kd.push(0xE0 | (Ld >>> 12));
        Kd.push(0x80 | ((Ld >>> 6) & 0x3F));
        Kd.push(0x80 | (Ld & 0x3F));
      } else {
        Kd.push(0xF0 | (Ld >>> 18));
        Kd.push(0x80 | ((Ld >>> 12) & 0x3F));
        Kd.push(0x80 | ((Ld >>> 6) & 0x3F));
        Kd.push(0x80 | (Ld & 0x3F));
      }
    }
    return new Uint8Array(Kd);
  };
  var Od = ['▒', 'Ç', 'ü', 'é', 'â', 'ä', 'à', 'å', 'ç', 'ê', 'ë', 'è', 'ï', 'î', 'ì', 'Ä', 'Å', 'É', 'æ', 'Æ', 'ô',
    'ö', 'ò', 'û', 'ù', 'ÿ', 'Ö', 'Ü', 'ø', '£', 'Ø', '×', 'ƒ', 'á', 'í', 'ó', 'ú', 'ñ', 'Ñ', 'ª', 'º', '¿', '®',
    '¬', '½', '¼', '¡', '«', '»', '¢', '¥', 'ß', '€'
  ];
  var Pd = [0x7F, 0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8D, 0x8E, 0x8F,
    0x90, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0x9B, 0x9C, 0x9D, 0x9E, 0x9F, 0xA0, 0xA1,
    0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xAB, 0xAC, 0xAD, 0xAE, 0xAF, 0xBD, 0xBE, 0xE1, 0xFF
  ];
  var Qd = function(Rd) {
    if (Rd == null || Rd.length == 0) {
      return new Uint8Array(0);
    }
    var Sd = new Uint8Array(Rd.length);
    for (var i = 0; i < Rd.length; i++) {
      var cp = Rd.charCodeAt(i);
      if (cp >= 0x20 && cp <= 0x7E) {
        Sd[i] = cp;
      } else {
        var cs = Rd.charAt(i);
        var c = 0x20;
        for (var j = 0; j < Od.length; j++) {
          if (cs == Od[j]) {
            c = Pd[j];
            break;
          }
        }
        Sd[i] = c;
      }
    }
    return Sd;
  };
  var Td = ['Ç', 'ü', 'é', 'â', 'ä', 'à', 'å', 'ç', 'ê', 'ë', 'è', 'ï', 'î', 'ì', 'Ä', 'Å', 'É', 'æ', 'Æ', 'ô', 'ö',
    'ò', 'û', 'ù', 'ÿ', 'Ö', 'Ü', 'ø', '£', 'Ø', '×', 'ƒ', 'á', 'í', 'ó', 'ú', 'ñ', 'Ñ', 'ª', 'º', '¿', '®', '½',
    '¼', '¡', 'Á', 'Â', 'À', '©', '¢', '¥', 'ã', 'Ã', 'ð', 'Ð', 'Ê', 'Ë', 'È', 'ı', 'Í', 'Î', 'Ï', 'Ì', 'Ó', 'ß',
    'Ô', 'Ò', 'õ', 'Õ', 'µ', 'þ', 'Þ', 'Ú', 'Û', 'Ù', 'ý', 'Ý', '±', '¾', '÷', '¸', '°', '¨', '·', '€'
  ];
  var Ud = [0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8D, 0x8E, 0x8F, 0x90,
    0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0x9B, 0x9C, 0x9D, 0x9E, 0x9F, 0xA0, 0xA1, 0xA2,
    0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAB, 0xAC, 0xAD, 0xB5, 0xB6, 0xB7, 0xB8, 0xBD, 0xBE, 0xC6, 0xC7,
    0xD0, 0xD1, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xDE, 0xE0, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7,
    0xE8, 0xE9, 0xEA, 0xEB, 0xEC, 0xED, 0xF1, 0xF3, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFF
  ];
  var Vd = function(Wd) {
    if (Wd == null || Wd.length == 0) {
      return new Uint8Array(0);
    }
    var Xd = new Uint8Array(Wd.length);
    for (var i = 0; i < Wd.length; i++) {
      var cp = Wd.charCodeAt(i);
      if (cp >= 0x20 && cp <= 0x7E) {
        Xd[i] = cp;
      } else {
        var c = 0x20;
        var cs = Wd.charAt(i);
        for (var j = 0; j < Td.length; j++) {
          if (cs == Td[j]) {
            c = Ud[j];
            break;
          }
        }
        Xd[i] = c;
      }
    }
    return Xd;
  };
  var Yd = function(Zd, $d, ae, be, ce) {
    var de = 0;
    var ee = 1;
    var fe = 0;
    var ge = 1;
    switch ($d) {
      case oc.CLS_RT_RIGHT90:
        be[ge] = ae[ge] - Zd[ee];
        be[fe] = ae[fe];
        break;
      case oc.CLS_RT_ROTATE180:
        be[fe] = ae[fe] - Zd[de];
        be[ge] = ae[ge] - Zd[ee];
        break;
      case oc.CLS_RT_LEFT90:
        be[fe] = ae[fe] - Zd[de];
        be[ge] = ae[ge];
        break;
      default:
        be[fe] = ae[fe];
        be[ge] = ae[ge];
        break;
    }
    if (ce == true) {
      if (be[fe] < 0) be[fe] = 0;
      if (be[ge] < 0) be[ge] = 0;
    }
  };
  var he = function(ie) {
    if (typeof(ie) === "undefined") {
      return false;
    }
    if (ie == null) {
      return false;
    }
    if (ie.match(/^[\x20-\x7f]*$/)) {
      return true;
    } else {
      return false;
    }
  };
  var je = {
    None: 0,
    Dither1: 1,
    Dither2: 2,
    Dither3: 3,
    RandomDither1: 4,
    RandomDither2: 5,
    Hatching: 6
  };
  var ke = {
    Format1bppIndexed: 1,
    Format2bppIndexed: 2,
    Format4bppIndexed: 4,
    Format8bppIndexed: 8,
    Format24bppRgb: 24,
    Format32bppArgb: 32,
    Format1bppGray: 0x101,
    Format2bppGray: 0x102,
    Format4bppGray: 0x104,
    Format8bppGray: 0x108,
    Undefined: 0
  };
  var le = function(me, ne) {
    var oe;
    switch (me) {
      case ke.Format1bppIndexed:
      case ke.Format1bppGray:
        oe = 1;
        break;
      case ke.Format4bppIndexed:
      case ke.Format4bppGray:
        oe = 4;
        break;
      case ke.Format8bppIndexed:
      case ke.Format8bppGray:
        oe = 8;
        break;
      case ke.Format24bppRgb:
        oe = 24;
        break;
      case ke.Format32bppArgb:
        oe = 32;
        break;
      default:
        return null;
    }
    var pe = Math.ceil(ne * oe / 32) * 4;
    return pe;
  };
  var qe = function(re, se, te) {
    var ue = le(re, se);
    if (ue != null) {
      return ue * te;
    }
    return null;
  };
  var ve = function(we, xe, ye) {
    var ze;
    switch (we) {
      case ke.Format1bppIndexed:
        ze = 0xff;
        break;
      case ke.Format4bppIndexed:
        ze = 0x11;
        break;
      case ke.Format8bppIndexed:
        ze = 0x01;
        break;
      default:
        return;
    }
    for (var Ae = 0; Ae < 0x100; Ae += ze) {
      xe[ye++] = Ae;
      xe[ye++] = Ae;
      xe[ye++] = Ae;
      xe[ye++] = 0;
    }
  };
  var Be = function(Ce, De, Ee) {
    var Fe = 14;
    var Ge = 40;
    var He = Fe + Ge;
    var Ie;
    switch (Ce) {
      case ke.Format1bppIndexed:
        Ie = 2;
        break;
      case ke.Format4bppIndexed:
        Ie = 16;
        break;
      case ke.Format8bppIndexed:
        Ie = 256;
        break;
      case ke.Format24bppRgb:
      case ke.Format32bppArgb:
        Ie = 0;
        break;
      default:
        return null;
    }
    var Je = He + Ie * 4;
    var Ke = qe(Ce, De, Ee);
    var Le = Ke + Je;
    var Me = 8000;
    var Ne = new Uint8Array(Je);
    Ne[0] = Number("B".charCodeAt(0));
    Ne[1] = Number("M".charCodeAt(0));
    Ne[2] = (Le >> 0) & 0xff;
    Ne[3] = (Le >> 8) & 0xff;
    Ne[4] = (Le >> 16) & 0xff;
    Ne[5] = (Le >> 24) & 0xff;
    Ne[6] = 0;
    Ne[7] = 0;
    Ne[8] = 0;
    Ne[9] = 0;
    Ne[10] = (Je >> 0) & 0xff;
    Ne[11] = (Je >> 8) & 0xff;
    Ne[12] = (Je >> 16) & 0xff;
    Ne[13] = (Je >> 24) & 0xff;
    Ne[14] = Ge;
    Ne[15] = 0;
    Ne[16] = 0;
    Ne[17] = 0;
    Ne[18] = (De >> 0) & 0xff;
    Ne[19] = (De >> 8) & 0xff;
    Ne[20] = (De >> 16) & 0xff;
    Ne[21] = (De >> 24) & 0xff;
    Ne[22] = (Ee >> 0) & 0xff;
    Ne[23] = (Ee >> 8) & 0xff;
    Ne[24] = (Ee >> 16) & 0xff;
    Ne[25] = (Ee >> 24) & 0xff;
    Ne[26] = 1;
    Ne[27] = 0;
    Ne[28] = Ce & 0xff;
    Ne[29] = 0;
    Ne[30] = 0;
    Ne[31] = 0;
    Ne[32] = 0;
    Ne[33] = 0;
    Ne[34] = (Ke >> 0) & 0xff;
    Ne[35] = (Ke >> 8) & 0xff;
    Ne[36] = (Ke >> 16) & 0xff;
    Ne[37] = (Ke >> 24) & 0xff;
    Ne[38] = (Me >> 0) & 0xff;
    Ne[39] = (Me >> 8) & 0xff;
    Ne[40] = (Me >> 16) & 0xff;
    Ne[41] = (Me >> 24) & 0xff;
    Ne[42] = (Me >> 0) & 0xff;
    Ne[43] = (Me >> 8) & 0xff;
    Ne[44] = (Me >> 16) & 0xff;
    Ne[45] = (Me >> 24) & 0xff;
    Ne[46] = (Me >> 0) & 0xff;
    Ne[47] = (Me >> 8) & 0xff;
    Ne[48] = (Me >> 16) & 0xff;
    Ne[49] = (Me >> 24) & 0xff;
    Ne[50] = (Me >> 0) & 0xff;
    Ne[51] = (Me >> 8) & 0xff;
    Ne[52] = (Me >> 16) & 0xff;
    Ne[53] = (Me >> 24) & 0xff;
    if (Ie > 0) {
      ve(Ce, Ne, He);
    }
    return Ne;
  };
  var Oe = function(Pe) {
    var Qe = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '+', '/'
    ];
    var Re = "";
    var Se = new Uint8Array(Pe);
    var Te = Se.length;
    var n = 0;
    var b = 0;
    var i = 0;
    while (i < Te) {
      b = Se[i];
      Re += Qe[(b >> 2)];
      n = (b & 0x03) << 4;
      i++;
      if (i >= Te) break;
      b = Se[i];
      Re += Qe[n | (b >> 4)];
      n = (b & 0x0f) << 2;
      i++;
      if (i >= Te) break;
      b = Se[i];
      Re += Qe[n | (b >> 6)];
      Re += Qe[(b & 0x3f)];
      i++;
    }
    var m = Te % 3;
    if (m) {
      Re += Qe[n];
    }
    if (m == 1) {
      Re += "==";
    } else if (m == 2) {
      Re += "=";
    }
    return Re;
  };
  var Ue = function(Ve) {
    var We = new Object();
    We[0x41] = 0;
    We[0x42] = 1;
    We[0x43] = 2;
    We[0x44] = 3;
    We[0x45] = 4;
    We[0x46] = 5;
    We[0x47] = 6;
    We[0x48] = 7;
    We[0x49] = 8;
    We[0x4a] = 9;
    We[0x4b] = 10;
    We[0x4c] = 11;
    We[0x4d] = 12;
    We[0x4e] = 13;
    We[0x4f] = 14;
    We[0x50] = 15;
    We[0x51] = 16;
    We[0x52] = 17;
    We[0x53] = 18;
    We[0x54] = 19;
    We[0x55] = 20;
    We[0x56] = 21;
    We[0x57] = 22;
    We[0x58] = 23;
    We[0x59] = 24;
    We[0x5a] = 25;
    We[0x61] = 26;
    We[0x62] = 27;
    We[0x63] = 28;
    We[0x64] = 29;
    We[0x65] = 30;
    We[0x66] = 31;
    We[0x67] = 32;
    We[0x68] = 33;
    We[0x69] = 34;
    We[0x6a] = 35;
    We[0x6b] = 36;
    We[0x6c] = 37;
    We[0x6d] = 38;
    We[0x6e] = 39;
    We[0x6f] = 40;
    We[0x70] = 41;
    We[0x71] = 42;
    We[0x72] = 43;
    We[0x73] = 44;
    We[0x74] = 45;
    We[0x75] = 46;
    We[0x76] = 47;
    We[0x77] = 48;
    We[0x78] = 49;
    We[0x79] = 50;
    We[0x7a] = 51;
    We[0x30] = 52;
    We[0x31] = 53;
    We[0x32] = 54;
    We[0x33] = 55;
    We[0x34] = 56;
    We[0x35] = 57;
    We[0x36] = 58;
    We[0x37] = 59;
    We[0x38] = 60;
    We[0x39] = 61;
    We[0x2b] = 62;
    We[0x2f] = 63;
    var Xe = Ve.length;
    var n = 0;
    var b = 0;
    var e;
    if (!Xe) return (new ArrayBuffer(0));
    if (Xe < 4) return null;
    if (Xe % 4) return null;
    e = Xe / 4 * 3;
    if (Ve.charAt(Xe - 1) == '=') e -= 1;
    if (Ve.charAt(Xe - 2) == '=') e -= 1;
    var Ye = new ArrayBuffer(e);
    var Ze = new Uint8Array(Ye);
    var i = 0;
    var p = 0;
    while (p < e) {
      b = We[Ve.charCodeAt(i)];
      if (b === undefined) return null;
      n = (b << 2);
      i++;
      b = We[Ve.charCodeAt(i)];
      if (b === undefined) return null;
      Ze[p] = n | ((b >> 4) & 0x3);
      n = (b & 0x0f) << 4;
      i++;
      p++;
      if (p >= e) break;
      b = We[Ve.charCodeAt(i)];
      if (b === undefined) return null;
      Ze[p] = n | ((b >> 2) & 0xf);
      n = (b & 0x03) << 6;
      i++;
      p++;
      if (p >= e) break;
      b = We[Ve.charCodeAt(i)];
      if (b === undefined) return null;
      Ze[p] = n | b;
      i++;
      p++;
    }
    return Ye;
  };
  var $e = function(af) {
    var i;
    var bf = [0xff, 0xd8];
    var cf = [0xff, 0xd9];
    if (af.length < (bf.length + cf.length)) {
      return false;
    }
    for (i = 0; i < bf.length; i++) {
      if (af[i] != bf[i]) {
        return false;
      }
    }
    var df = af.length - cf.length;
    for (i = 0; i < cf.length; i++) {
      if (af[df++] != cf[i]) {
        return false;
      }
    }
    return true;
  };
  var ef = function(ff) {
    var gf = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    if (ff.length < gf.length) {
      return false;
    }
    for (var i = 0; i < gf.length; i++) {
      if (ff[i] != gf[i]) {
        return false;
      }
    }
    return true;
  };
  var hf = function(jf) {
    var kf = [0x47, 0x49, 0x46, 0x38];
    if (jf.length < kf.length) {
      return false;
    }
    for (var i = 0; i < kf.length; i++) {
      if (jf[i] != kf[i]) {
        return false;
      }
    }
    return true;
  };
  var lf = function(mf) {
    var nf = [0x42, 0x4D];
    if (mf.length < nf.length) {
      return false;
    }
    for (var i = 0; i < nf.length; i++) {
      if (mf[i] != nf[i]) {
        return false;
      }
    }
    return true;
  };
  var of = function(pf) {
    var qf;
    if ($e(pf)) {
      qf = "data:image/jpeg;base64,";
    } else if (ef(pf)) {
      qf = "data:image/png;base64,";
    } else if (hf(pf)) {
      qf = "data:image/gif;base64,";
    } else if (lf(pf)) {
      qf = "data:image/bmp;base64,";
    } else {
      qf = "data:image/unknown;base64,";
    }
    return qf;
  };
  var rf = function(sf) {
    if (!ef(sf)) return null;
    var tf = 0x10;
    var uf = 0;
    uf += sf[tf++] << 24;
    uf += sf[tf++] << 16;
    uf += sf[tf++] << 8;
    uf += sf[tf++] << 0;
    return uf;
  };
  var vf = function(wf) {
    if (!ef(wf)) return null;
    var yf = 0x14;
    var zf = 0;
    zf += wf[yf++] << 24;
    zf += wf[yf++] << 16;
    zf += wf[yf++] << 8;
    zf += wf[yf++] << 0;
    return zf;
  };
  var Af = function(Bf) {
    if (!ef(Bf)) return null;
    var Cf = Bf[0x18];
    var Df = Bf[0x19];
    switch (Df) {
      case 6:
        switch (Cf) {
          case 16:
            break;
          case 8:
            return ke.Format32bppArgb;
          default:
            break;
        }
        break;
      case 4:
        switch (Cf) {
          case 16:
            break;
          case 8:
            break;
          default:
            break;
        }
        break;
      case 3:
        switch (Cf) {
          case 8:
            return ke.Format8bppIndexed;
          case 4:
            return ke.Format4bppIndexed;
          case 2:
            return ke.Format2bppIndexed;
          case 1:
            return ke.Format1bppIndexed;
          default:
            break;
        }
        break;
      case 2:
        switch (Cf) {
          case 16:
            break;
          case 8:
            return ke.Format24bppRgb;
          default:
            break;
        }
        break;
      case 0:
        switch (Cf) {
          case 16:
            break;
          case 8:
            return ke.Format8bppGray;
          case 4:
            return ke.Format4bppGray;
          case 2:
            return ke.Format2bppGray;
          case 1:
            return ke.Format1bppGray;
          default:
            break;
        }
        break;
      default:
        break;
    }
    return ke.Undefined;
  };
  var Ef = function(Ff, Gf, Hf, If) {
    var Jf = Gf;
    var Kf;
    if (If == true) {
      Kf = le(ke.Format4bppIndexed, Gf);
    } else {
      Kf = parseInt((Gf + 1) / 2, 10);
    }
    var Lf = new Uint8ClampedArray(Kf * Hf);
    for (var y = 0, srcXref = 0, dstXref = 0; y < Hf; y++, srcXref += Jf, dstXref += Kf) {
      var Mf = dstXref;
      for (var x = 0; x < Gf; x++) {
        var Nf = Ff[srcXref + x];
        Nf &= 0xf0;
        if (If == false) {
          Nf = 0xf0 - Nf;
        }
        if (0 == (x % 2)) {
          Lf[Mf] = Nf;
        } else {
          Lf[Mf] |= Nf >> 4;
          Mf++;
        }
      }
    }
    return Lf;
  };
  var Of = function(Pf, Qf, Rf, Sf) {
    var Tf = new Uint8ClampedArray([0x7F, 0xBF, 0xDF, 0xEF, 0xF7, 0xFB, 0xFD, 0xFE]);
    var Uf = 0x7F;
    var Vf = Qf;
    var Wf;
    if (Sf == true) {
      Wf = parseInt((Qf + 31) / 32, 10) * 4;
      Wf = le(ke.Format1bppIndexed, Qf);
    } else {
      Wf = parseInt((Qf + 7) / 8, 10);
    }
    var Xf = new Uint8ClampedArray(Wf * Rf);
    for (var y = Rf - 1, srcXref = 0; y >= 0; y--, srcXref += Vf) {
      var Yf = Wf * y;
      for (var x = 0; x < Qf; x += 8) {
        var Zf = 0xFF;
        for (var $f = 0; $f < 8; $f++) {
          if ((x + $f) < Qf) {
            var ag = Pf[srcXref + x + $f];
            if (ag <= Uf) {
              Zf &= Tf[$f];
            }
          }
        }
        if (Sf == false) {
          Zf = 0xff & (0xFF - Zf);
        }
        Xf[Yf++] = Zf;
      }
    }
    return Xf;
  };
  var bg = function(cg, dg, eg) {
    var fg = new Uint8ClampedArray(dg * eg);
    for (var i = 0; i < eg; i++) {
      for (var j = 0; j < dg; j++) {
        var gg = (j + i * dg) * 4;
        var hg = new Uint8ClampedArray([cg[gg + 0] * 0.298912 + cg[gg + 1] * 0.586611 + cg[gg + 2] * 0.114478]);
        alpha = cg[gg + 3];
        backColor = 255;
        hg[0] = (hg[0] * alpha / 255) + (backColor - alpha);
        fg[gg / 4] = hg[0];
      }
    }
    return fg;
  };
  var ig = function(jg, kg, lg) {
    var ng = new Uint8ClampedArray(kg * lg * 4);
    var og = 0;
    for (var y = 0; y < lg; y++) {
      for (var x = 0; x < kg; x++) {
        var pg = og * 4;
        ng[pg++] = jg[og];
        ng[pg++] = jg[og];
        ng[pg++] = jg[og];
        ng[pg++] = 255;
        og++;
      }
    }
    return ng;
  };
  var qg = function(rg, sg, tg, ug, vg) {
    vg = Math.round(vg);
    ug = Math.round(ug);
    var wg = tg / vg;
    var xg = sg / ug;
    var yg = new Uint8ClampedArray(dstStride * vg);
    for (var zg = 0; zg < vg; zg++) {
      var Ag = Math.floor(wg * zg);
      if (Ag >= tg) {
        break;
      }
      for (var Bg = 0; Bg < ug; Bg++) {
        var Cg = Math.floor(xg * Bg);
        var Dg = srcStride * Ag + Cg;
        var Eg = dstStride * zg + Bg;
        if ((Cg >= sg) || (Dg >= rg.length) || (Eg >= yg.length)) {
          break;
        }
        yg[Eg] = rg[Dg];
      }
    }
    return yg;
  };
  var Fg = function(Gg, Hg, Ig, Jg, Kg) {
    var Lg = [
      [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
      [11, 4, 6, 9, 12, 0, 2, 14, 7, 8, 10, 5, 3, 15, 13, 1],
      [6, 7, 8, 9, 5, 0, 1, 10, 4, 3, 2, 11, 15, 14, 13, 12]
    ];
    var Mg = Lg[Jg][(Ig % 4) * 4 + (Hg % 4)];
    var Ng = 0;
    switch (Gg) {
      case 2:
        Ng = ((Mg * 16 + 8) - 128) + Kg;
        break;
      case 4:
        Ng = ((Mg * 8 + 4) - 64) + Kg;
        break;
      case 8:
        Ng = ((Mg * 4 + 2) - 32) + Kg;
        break;
      case 16:
        Ng = ((Mg * 2 + 1) - 16) + Kg;
        break;
      default:
        break;
    }
    if (Ng < 0) {
      Kg = 0;
    } else if (255 < Ng) {
      Kg = 255;
    } else {
      Kg = Ng;
    }
    return Kg;
  };
  var Og = function(Pg, Qg, Rg, Sg, Tg) {
    var Ug = 127;
    var Vg = Qg;
    var Wg = Qg;
    var Xg = new Uint8ClampedArray(Vg * Rg);
    for (var y = 0, srcXref = 0; y < Rg; y++, srcXref += Vg) {
      for (var x = 0; x < Qg; x++) {
        var Yg = Pg[srcXref + x];
        if (Sg == 16) {
          Yg = Fg(16, x, y, Tg - je.Dither1, Yg);
        } else {
          Yg = Fg(2, x, y, Tg - je.Dither1, Yg);
        }
        Xg[srcXref + x] = Yg;
      }
    }
    return Xg;
  };
  var Zg = new Uint8Array(256);
  var $g = function(ah, bh, dh, eh) {
    var fh;
    var gh = 255 * Math.Pow((eh / 255), (1 / ah));
    var hh = (gh - 128) * bh + 128;
    hh += dh;
    if (hh < 0) {
      fh = 0;
    } else if (255 < hh) {
      fh = 255;
    } else {
      fh = hh;
    }
    return fh;
  };
  var ih = function(jh, kh, lh) {
    for (var mh = 0; mh < 256; mh++) {
      Zg[mh] = $g(jh, kh, lh, mh);
    }
  };
  var nh = function(oh, ph, qh, rh) {
    var sh = 0x7F;
    var th = ph;
    var uh = ph;
    var vh = new Uint8ClampedArray(th * qh);
    for (var y = 0, srcXref = 0, dstXref = 0; y < qh; y++, srcXref += th, dstXref += uh) {
      for (var x = 0; x < ph; x++) {
        var wh = oh[srcXref + x];
        if (rh == 16) {
          wh &= 0xf0;
          if (wh == 0xf0) wh = 0xff;
        } else {
          wh = wh > sh ? 255 : 0;
        }
        vh[dstXref + x] = wh;
      }
    }
    return vh;
  };
  var xh = function(yh, zh, Ah, Bh) {
    var Ch = [
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00,
        0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff,
        0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0xff, 0x00, 0x00, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00,
        0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff,
        0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0x00,
        0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00, 0xff,
        0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff,
        0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff,
        0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0x00, 0xff, 0x00, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00,
        0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff,
        0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff,
        0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff,
        0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00, 0xff, 0xff,
        0xff, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ],
      [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      ]
    ];
    if (Bh != 0) {
      var Dh = Bh;
      if (Dh < 0) Dh = 0;
      else if (Dh > 20) Dh = 20;
      Ah |= Ch[Dh][(zh % 8) * 8 + (yh % 8)];
    }
    return Ah;
  };
  var Eh = function(Fh, Gh, Hh, Ih, Jh) {
    var Kh = 127;
    var y;
    var x;
    var Lh = [
      [0 / 16.0, 0 / 16.0, 7.0 / 16.0],
      [3.0 / 16.0, 5.0 / 16.0, 1.0 / 16.0]
    ];
    var Mh = [
      [0 / 48, 0 / 48, 0 / 48, 7.0 / 48, 5.0 / 48],
      [3.0 / 48, 5.0 / 48, 7.0 / 48, 5.0 / 48, 3.0 / 48],
      [1.0 / 48, 3.0 / 48, 5.0 / 48, 3.0 / 48, 1.0 / 48]
    ];
    var Nh;
    if (Jh == je.RandomDither1) Nh = Lh;
    else Nh = Mh;
    var my = Nh[0].length;
    var mx = Nh[1].length;
    var Oh = Gh;
    var Ph = Gh;
    var Qh = new Uint8ClampedArray(Oh * Hh);
    var Rh = new Int32Array(Hh * Oh);
    for (y = 0, srcXref = 0; y < Hh; y++, srcXref += Oh) {
      for (x = 0; x < Oh; x++) {
        Rh[srcXref + x] = Fh[srcXref + x];
      }
    }
    for (y = 0, srcXref = 0, dstXref = 0; y < Hh; y++, srcXref += Oh, dstXref += Ph) {
      for (x = 0; x < Oh; x++) {
        var Sh = Rh[srcXref + x];
        var Th;
        if (Ih == 16) {
          if (Sh > 255) Sh = 255;
          if (Sh < 0) Sh = 0;
          Th = Sh & 0xf0;
          if (Th == 0xf0) Th = 0xff;
        } else {
          Th = Sh > Kh ? 255 : 0;
        }
        Qh[dstXref + x] = Th;
        var Uh = Sh - Th;
        for (var oy = 0, iy = y; oy < my && iy < Hh; oy++, iy++) {
          for (var ox = 0, ix = x - (mx - 1) / 2; ox < mx && ix < Oh; ox++, ix++) {
            if (ix < 0) continue;
            if (Nh[oy][ox] == 0.0) continue;
            var Vh = Rh[iy * ix] + Uh * Nh[oy][ox];
            Rh[iy * ix] = Vh;
          }
        }
      }
    }
    return Qh;
  };
  var Wh = function(Xh, Yh, Zh, $h) {
    if ($h == 0) {
      return Xh;
    }
    var ai = Yh;
    var bi = Yh;
    var ci = bi * Zh;
    bgraValues = new Uint8ClampedArray(ci);
    System.Runtime.InteropServices.Marshal.Copy(ptr, bgraValues, 0, ci);
    var x = 0;
    var y = 0;
    for (var di = 0; di < bgraValues.Length; di += 4) {
      var ei = xh(x++, y, bgraValues[di + 0], $h);
      bgraValues[di + 0] = ei;
      bgraValues[di + 1] = ei;
      bgraValues[di + 2] = ei;
      if (x >= (bmpData.Stride / 4)) {
        x = 0;
        y++;
      }
    }
    return bgraValues;
  };
  var fi = function(gi, hi, ii, ji) {
    var ki = hi;
    var li = hi;
    dstData = new Uint8ClampedArray(li * ii);
    for (var y = 0, srcXref = 0, dstXref = 0; y < ii; y++, srcXref += ki, dstXref += li) {
      for (var x = 0; x < hi; x++) {
        var mi = gi[srcXref + x + 0];
        if (ji != 0) {
          mi = xh(x, y, mi, ji);
        }
        dstData[dstXref + x] = mi;
      }
    }
    return dstData;
  };
  var ni = function(oi, x, y, pi, qi, ri, si) {
    var ti = oi.getImageData(x, y, pi, qi);
    var ui = oi.createImageData(pi, qi);
    var vi = ti.data;
    var wi = ui.data;
    var xi = ri ? 16 : 2;
    var yi;
    var zi;
    var Ai = bg(vi, pi, qi);
    if (si) {
      Ai = new Uint8Array(Og(Ai, pi, qi, xi, je.Dither1));
    }
    if (ri) {
      yi = Ef(Ai, pi, qi, true);
      zi = Be(ke.Format4bppIndexed, pi, qi);
    } else {
      yi = Of(Ai, pi, qi, true);
      zi = Be(ke.Format1bppIndexed, pi, qi);
    }
    var Bi = new Uint8Array(zi.byteLength + yi.byteLength);
    Bi.set(new Uint8Array(zi), 0);
    Bi.set(new Uint8Array(yi), zi.byteLength);
    return Bi;
  };
  var Ci = function(Di, Ei, Fi, Gi, Hi) {
    var Ii = 0;
    var Ji = 0;
    var Ki = 0;
    var Li = 0;
    var Mi = 0;
    var Ni = 0;
    var Oi;
    var Pi;
    var Qi;
    var Ri;
    var Si;
    var Ti;
    var Ui;
    if (Fi <= 0 && Gi <= 0) {
      Oi = Di.width;
      Pi = Di.height;
    } else {
      Mi = Di.width;
      Ni = Di.height;
      if (Fi > 0) {
        Ii = Math.round(Mi * Fi / Mi);
        Ji = Math.round(Ni * Fi / Mi);
      }
      if (Gi > 0) {
        Ki = Math.round(Mi * Gi / Ni);
        Li = Math.round(Ni * Gi / Ni);
      }
      if (Ji != 0 && (Gi == 0 || Ji <= Gi)) {
        Oi = Ii;
        Pi = Ji;
      } else {
        Oi = Ki;
        Pi = Li;
      }
    }
    switch (Ei) {
      case oc.CLS_RT_RIGHT90:
        Qi = 90;
        Ri = Pi;
        Si = 0;
        Ti = Pi;
        Ui = Oi;
        break;
      case oc.CLS_RT_ROTATE180:
        Qi = 180;
        Ri = Oi;
        Si = Pi;
        Ti = Oi;
        Ui = Pi;
        break;
      case oc.CLS_RT_LEFT90:
        Qi = 270;
        Ri = 0;
        Si = Oi;
        Ti = Pi;
        Ui = Oi;
        break;
      default:
        Qi = 0;
        Ri = 0;
        Si = 0;
        Ti = Oi;
        Ui = Pi;
        break;
    }
    var Vi = document.createElement("canvas");
    var Wi = Vi.getContext('2d');
    Vi.width = Ti;
    Vi.height = Ui;
    if (Qi != 0) {
      Wi.translate(Ri, Si);
      Wi.rotate(Qi * Math.PI / 180);
    }
    Wi.drawImage(Di, 0, 0, Oi, Pi);
    var Xi = ni(Wi, 0, 0, Vi.width, Vi.height, false, true);
    if (Hi != null) {
      if (Hi.length == 2) {
        Hi[0] = Vi.width;
        Hi[1] = Vi.height;
      }
    }
    return Xi;
  };
  var Yi = 'None';
  var Zi = 'Shift_JIS';
  var $i = 'GB18030';
  var aj = 'EUC-KR';
  var bj = 'Big5';
  var cj = 'cp437';
  var dj = 'cp850';
  var ej = 'cp860';
  var fj = 'cp863';
  var gj = 'cp865';
  var hj = 'cp852';
  var ij = 'cp866';
  var jj = 'cp857';
  var kj = 'cp864';
  var lj = 'windows-1252';
  var mj = (function() {
    var mj = function(nj) {
      this.dt = new Uint8Array(0);
      this.ec = Yi;
      if (nj) this.ec = nj;
    };
    var oj = mj.prototype;
    oj.add = function(pj) {
      var qj = new Uint8Array(pj);
      var rj = this.dt.byteLength + qj.byteLength;
      var sj = new Uint8Array(rj);
      sj.set(this.dt, 0);
      sj.set(qj, this.dt.byteLength);
      this.dt = sj;
    };
    oj.get = function() {
      return this.dt;
    };
    oj.enc = function() {
      return this.ec;
    };
    return mj;
  })();
  var tj = (function() {
    var tj = function() {
      this.sc = new Array();
      this.dc = new Array();
      this.bno = 0;
    };
    var uj = tj.prototype;
    uj.addS = function(vj) {
      this.sc.push(vj);
    };
    uj.addD = function(wj) {
      this.dc.push(wj);
    };
    return tj;
  })();
  var xj = function(yj, zj) {
    var Aj = oc.CLS_SUCCESS;
    switch (yj) {
      case oc.CLS_ENC_CDPG_SHIFT_JIS:
        zj[0] = Zi;
        break;
      case oc.CLS_ENC_CDPG_GB18030:
        zj[0] = $i;
        break;
      case oc.CLS_ENC_CDPG_EUC_KR:
        zj[0] = aj;
        break;
      case oc.CLS_ENC_CDPG_BIG5:
        zj[0] = bj;
        break;
      case oc.CLS_ENC_CDPG_IBM437:
        zj[0] = cj;
        break;
      case oc.CLS_ENC_CDPG_IBM850:
        zj[0] = dj;
        break;
      case oc.CLS_ENC_CDPG_IBM860:
        zj[0] = ej;
        break;
      case oc.CLS_ENC_CDPG_IBM863:
        zj[0] = fj;
        break;
      case oc.CLS_ENC_CDPG_IBM865:
        zj[0] = gj;
        break;
      case oc.CLS_ENC_CDPG_IBM852:
        zj[0] = hj;
        break;
      case oc.CLS_ENC_CDPG_CP866:
        zj[0] = ij;
        break;
      case oc.CLS_ENC_CDPG_IBM857:
        zj[0] = jj;
        break;
      case oc.CLS_ENC_CDPG_IBM864:
        zj[0] = kj;
        break;
      case oc.CLS_ENC_CDPG_WINDOWS_1252:
        zj[0] = lj;
        break;
      default:
        Aj = oc.CLS_E_ILLEGAL;
        break;
    }
    return Aj;
  };
  var Bj = function(Cj, Dj) {
    var Ej = true;
    switch (Cj) {
      case oc.CLS_ENC_CDPG_SHIFT_JIS:
        Dj[0] = "SJ";
        break;
      case oc.CLS_ENC_CDPG_IBM437:
        Dj[0] = "PC";
        break;
      case oc.CLS_ENC_CDPG_IBM850:
        Dj[0] = "PM";
        break;
      case oc.CLS_ENC_CDPG_IBM852:
        Dj[0] = "PE";
        break;
      case oc.CLS_ENC_CDPG_IBM864:
        Dj[0] = "PR";
        break;
      case oc.CLS_ENC_CDPG_CP866:
        Dj[0] = "CU";
        break;
      case oc.CLS_ENC_CDPG_WINDOWS_1252:
        Dj[0] = "W1";
        break;
      default:
        Ej = false;
        break;
    }
    return Ej;
  };
  var Fj = function(Gj, Hj, Ij) {
    var Jj;
    if ((Ij == oc.CLS_PRT_FNT_TRIUMVIRATE) || (Ij == oc.CLS_PRT_FNT_TRIUMVIRATE_B)) {
      byteData = Vd(Gj);
      Jj = new mj();
      Jj.add(byteData);
      return Jj;
    }
    switch (Hj) {
      case oc.CLS_LOCALE_JP:
        Jj = new mj(Zi);
        Jj.add(Id(Gj));
        break;
      case oc.CLS_LOCALE_OTHER:
        Jj = new mj();
        Jj.add(Qd(Gj));
        break;
      case oc.CLS_LOCALE_CN:
        Jj = new mj($i);
        Jj.add(Id(Gj));
        break;
      case oc.CLS_LOCALE_KR:
        Jj = new mj(aj);
        Jj.add(Id(Gj));
        break;
      default:
        break;
    }
    return Jj;
  };
  var Kj = function(Lj, Mj) {
    var Nj = true;
    switch (Lj) {
      case oc.CLS_PRT_FNT_SIZE_4:
        Mj[0] = "A04";
        break;
      case oc.CLS_PRT_FNT_SIZE_5:
        Mj[0] = "A05";
        break;
      case oc.CLS_PRT_FNT_SIZE_6:
        Mj[0] = "A06";
        break;
      case oc.CLS_PRT_FNT_SIZE_8:
        Mj[0] = "A08";
        break;
      case oc.CLS_PRT_FNT_SIZE_10:
        Mj[0] = "A10";
        break;
      case oc.CLS_PRT_FNT_SIZE_12:
        Mj[0] = "A12";
        break;
      case oc.CLS_PRT_FNT_SIZE_14:
        Mj[0] = "A14";
        break;
      case oc.CLS_PRT_FNT_SIZE_18:
        Mj[0] = "A18";
        break;
      case oc.CLS_PRT_FNT_SIZE_24:
        Mj[0] = "A24";
        break;
      case oc.CLS_PRT_FNT_SIZE_30:
        Mj[0] = "A30";
        break;
      case oc.CLS_PRT_FNT_SIZE_36:
        Mj[0] = "A36";
        break;
      case oc.CLS_PRT_FNT_SIZE_48:
        Mj[0] = "A48";
        break;
      default:
        Nj = false;
        break;
    }
    return Nj;
  };
  var Oj = function(Pj, Qj) {
    var Rj = true;
    switch (Pj) {
      case oc.CLS_PRT_FNT_SIZE_4:
        Qj[0] = "C04";
        break;
      case oc.CLS_PRT_FNT_SIZE_5:
        Qj[0] = "C05";
        break;
      case oc.CLS_PRT_FNT_SIZE_6:
        Qj[0] = "C06";
        break;
      case oc.CLS_PRT_FNT_SIZE_8:
        Qj[0] = "C08";
        break;
      case oc.CLS_PRT_FNT_SIZE_10:
        Qj[0] = "C10";
        break;
      case oc.CLS_PRT_FNT_SIZE_12:
        Qj[0] = "C12";
        break;
      case oc.CLS_PRT_FNT_SIZE_14:
        Qj[0] = "C14";
        break;
      case oc.CLS_PRT_FNT_SIZE_18:
        Qj[0] = "C18";
        break;
      case oc.CLS_PRT_FNT_SIZE_24:
        Qj[0] = "C24";
        break;
      case oc.CLS_PRT_FNT_SIZE_30:
        Qj[0] = "C30";
        break;
      case oc.CLS_PRT_FNT_SIZE_36:
        Qj[0] = "C36";
        break;
      case oc.CLS_PRT_FNT_SIZE_48:
        Qj[0] = "C48";
        break;
      default:
        Rj = false;
        break;
    }
    return Rj;
  };
  var Sj = function(Tj, Uj) {
    var Vj = true;
    switch (Tj) {
      case oc.CLS_PRT_FNT_KANJI_SIZE_16:
        Uj[0] = "KB16";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_24:
        Uj[0] = "KB24";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_32:
        Uj[0] = "KB32";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_48:
        Uj[0] = "KB48";
        break;
      default:
        Vj = false;
        break;
    }
    return Vj;
  };
  var Wj = function(Xj, Yj) {
    var Zj = true;
    switch (Xj) {
      case oc.CLS_PRT_FNT_KANJI_SIZE_16:
        Yj[0] = "KC16";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_24:
        Yj[0] = "KC24";
        break;
      default:
        Zj = false;
        break;
    }
    return Zj;
  };
  var $j = function(ak, bk) {
    var ck = true;
    switch (ak) {
      case oc.CLS_PRT_FNT_KANJI_SIZE_16:
        bk[0] = "KR16";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_24:
        bk[0] = "KR24";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_32:
        bk[0] = "KR32";
        break;
      case oc.CLS_PRT_FNT_KANJI_SIZE_48:
        bk[0] = "KR48";
        break;
      default:
        ck = false;
        break;
    }
    return ck;
  };
  var dk = function(ek, fk, gk, hk) {
    var ik = oc.CLS_SUCCESS;
    switch (ek) {
      case oc.CLS_PRT_FNT_TRIUMVIRATE:
      case oc.CLS_PRT_FNT_TRIUMVIRATE_B:
        if ((fk < oc.CLS_PRT_FNT_SIZE_4) || (oc.CLS_PRT_FNT_SIZE_48 < fk)) {
          return oc.CLS_E_ILLEGAL;
        }
        break;
      case oc.CLS_PRT_FNT_KANJI:
      case oc.CLS_PRT_FNT_KANJIT:
        if ((fk < oc.CLS_PRT_FNT_KANJI_SIZE_16) || (oc.CLS_PRT_FNT_KANJI_SIZE_48 < fk)) {
          return oc.CLS_E_ILLEGAL;
        }
        break;
      default:
        break;
    }
    switch (ek) {
      case oc.CLS_PRT_FNT_TRIUMVIRATE:
        if (Kj(fk, gk) == false) {
          return oc.CLS_E_ILLEGAL;
        }
        break;
      case oc.CLS_PRT_FNT_TRIUMVIRATE_B:
        if (Oj(fk, gk) == false) {
          return oc.CLS_E_ILLEGAL;
        }
        break;
      case oc.CLS_PRT_FNT_KANJI:
      case oc.CLS_PRT_FNT_KANJIT:
        var jk = false;
        if (hk == oc.CLS_LOCALE_CN) jk = Wj(fk, gk);
        else if (hk == oc.CLS_LOCALE_KR) jk = $j(fk, gk);
        else jk = Sj(fk, gk);
        if (jk == false) {
          return oc.CLS_E_ILLEGAL;
        }
        if (ek == oc.CLS_PRT_FNT_KANJIT) {
          gk[0] = gk[0].replace('K', 'k');
        }
        break;
      default:
        gk[0] = "000";
        break;
    }
    return ik;
  };
  var kk = function(lk, mk, nk) {
    var ok = oc.CLS_SUCCESS;
    switch (mk) {
      case oc.CLS_BCS_CODE128:
        lk = "B" + lk;
        break;
      default:
        break;
    }
    var pk = he(lk);
    if (pk == false) {
      return oc.CLS_E_ILLEGAL;
    }
    nk.add(Gd(lk));
    return ok;
  };
  var qk = function(rk, sk) {
    var tk = "";
    switch (rk) {
      case oc.CLS_BCS_CODE39:
        tk = "a";
        break;
      case oc.CLS_BCS_UPCA:
        tk = "b";
        break;
      case oc.CLS_BCS_UPCE:
        tk = "c";
        break;
      case oc.CLS_BCS_INTERLEAVED25:
        tk = "d";
        break;
      case oc.CLS_BCS_CODE128:
        tk = "e";
        break;
      case oc.CLS_BCS_EAN13:
        tk = "f";
        break;
      case oc.CLS_BCS_EAN8:
        tk = "g";
        break;
      case oc.CLS_BCS_HIBC:
        tk = "h";
        break;
      case oc.CLS_BCS_CODABAR:
        tk = "i";
        break;
      case oc.CLS_BCS_INT25:
        tk = "j";
        break;
      case oc.CLS_BCS_PLESSEY:
        tk = "k";
        break;
      case oc.CLS_BCS_CASECODE:
        tk = "l";
        break;
      case oc.CLS_BCS_UPC2DIG:
        tk = "m";
        break;
      case oc.CLS_BCS_UPC5DIG:
        tk = "n";
        break;
      case oc.CLS_BCS_CODE93:
        tk = "o";
        break;
      case oc.CLS_BCS_ITF14:
      case oc.CLS_BCS_ZIP:
        tk = "p";
        break;
      case oc.CLS_BCS_ITF16:
      case oc.CLS_BCS_UCCEAN128:
        tk = "q";
        break;
      case oc.CLS_BCS_INDUSTRIAL25:
      case oc.CLS_BCS_UCCEAN128KMART:
        tk = "r";
        break;
      case oc.CLS_BCS_COOP25:
      case oc.CLS_BCS_UCCEAN128RANDOMWEIGHT:
        tk = "s";
        break;
      case oc.CLS_BCS_TELEPEN:
        tk = "t";
        break;
      default:
        break;
    }
    if (sk == oc.CLS_BCS_TEXT_SHOW) {
      tk = tk.toUpperCase();
    }
    return tk;
  };
  var uk = function(vk) {
    var wk = 0;
    var xk = vk.length;
    if (vk.search(/^[0-9]+$/) != -1) {
      if (xk <= 6) {
        wk = 10;
      } else if (xk <= 10) {
        wk = 12;
      } else if (xk <= 16) {
        wk = 14;
      } else if (xk <= 24) {
        wk = 16;
      } else if (xk <= 36) {
        wk = 18;
      } else if (xk <= 44) {
        wk = 20;
      } else if (xk <= 60) {
        wk = 22;
      } else if (xk <= 72) {
        wk = 24;
      } else if (xk <= 88) {
        wk = 26;
      } else if (xk <= 124) {
        wk = 32;
      } else if (xk <= 172) {
        wk = 36;
      } else if (xk <= 228) {
        wk = 40;
      } else if (xk <= 288) {
        wk = 44;
      } else if (xk <= 348) {
        wk = 48;
      } else if (xk <= 408) {
        wk = 52;
      } else if (xk <= 560) {
        wk = 64;
      } else if (xk <= 736) {
        wk = 72;
      } else if (xk <= 912) {
        wk = 80;
      } else if (xk <= 1152) {
        wk = 88;
      } else if (xk <= 1392) {
        wk = 96;
      } else if (xk <= 1632) {
        wk = 104;
      } else if (xk <= 2100) {
        wk = 120;
      } else if (xk <= 2608) {
        wk = 132;
      } else if (xk <= 3116) {
        wk = 144;
      }
    } else {
      if (xk <= 3) {
        wk = 10;
      } else if (xk <= 6) {
        wk = 12;
      } else if (xk <= 10) {
        wk = 14;
      } else if (xk <= 16) {
        wk = 16;
      } else if (xk <= 25) {
        wk = 18;
      } else if (xk <= 31) {
        wk = 20;
      } else if (xk <= 43) {
        wk = 22;
      } else if (xk <= 52) {
        wk = 24;
      } else if (xk <= 64) {
        wk = 26;
      } else if (xk <= 91) {
        wk = 32;
      } else if (xk <= 127) {
        wk = 36;
      } else if (xk <= 169) {
        wk = 40;
      } else if (xk <= 214) {
        wk = 44;
      } else if (xk <= 259) {
        wk = 48;
      } else if (xk <= 304) {
        wk = 52;
      } else if (xk <= 418) {
        wk = 64;
      } else if (xk <= 550) {
        wk = 72;
      } else if (xk <= 682) {
        wk = 80;
      } else if (xk <= 862) {
        wk = 88;
      } else if (xk <= 1042) {
        wk = 96;
      } else if (xk <= 1222) {
        wk = 104;
      } else if (xk <= 1573) {
        wk = 120;
      } else if (xk <= 1954) {
        wk = 132;
      } else if (xk <= 2335) {
        wk = 144;
      }
    }
    return wk;
  };
  var yk = function(zk, Ak) {
    var Bk = oc.CLS_SUCCESS;
    switch (zk) {
      case oc.CLS_GS1_DATABAR_OMNI_DIRECTIONAL:
        Ak[0] = "R100";
        break;
      case oc.CLS_GS1_DATABAR_COMPOSITE:
        Ak[0] = "R100";
        break;
      case oc.CLS_GS1_DATABAR_TRUNCATION:
        Ak[0] = "T100";
        break;
      case oc.CLS_GS1_DATABAR_STACKED:
        Ak[0] = "S100";
        break;
      case oc.CLS_GS1_DATABAR_STACKED_OMNI_DIRECTIONAL:
        Ak[0] = "D100";
        break;
      case oc.CLS_GS1_DATABAR_LIMITED:
        Ak[0] = "L100";
        break;
      case oc.CLS_GS1_DATABAR_EXPANDED:
        Ak[0] = "E100";
        break;
      default:
        Bk = oc.CLS_E_ILLEGAL;
        break;
    }
    return Bk;
  };
  var Ck = function(Dk, Ek, Fk, Gk, Hk, Ik, x, y, Jk) {
    var Kk = oc.CLS_SUCCESS;
    if ((typeof(Dk) === "undefined") || (typeof(Ek) === "undefined") || (typeof(Fk) === "undefined") || (typeof(Gk) ===
        "undefined") || (typeof(Hk) === "undefined") || (typeof(Ik) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined") || (typeof(Jk) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Ek < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < Ek)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Fk < oc.CLS_PRT_FNT_0) || (oc.CLS_PRT_FNT_TRIUMVIRATE < Fk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Gk < 1) || (jd < Gk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Hk < 1) || (jd < Hk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Ik == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Ik.length != 3) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Jk == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Jk.dt.length == 0) {
      return oc.CLS_E_ILLEGAL;
    }
    var Lk = "";
    Lk += Ek;
    Lk += Fk;
    Lk += xd(Gk);
    Lk += xd(Hk);
    Lk += Ik;
    Lk += Ad(y, "0000");
    Lk += Ad(x, "0000");
    var Mk = new mj();
    Mk.add(Gd(Lk));
    Dk.addD(Mk);
    Jk.add([CR, LF]);
    Dk.addD(Jk);
    return Kk;
  };
  var Nk = function(Ok, Pk, Qk, Rk, x, y, Sk, Tk) {
    var Uk = oc.CLS_SUCCESS;
    if ((typeof(Ok) === "undefined") || (typeof(Pk) === "undefined") || (typeof(Qk) === "undefined") || (typeof(Rk) ===
        "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(Sk) === "undefined") ||
      (typeof(Tk) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Pk < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < Pk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Qk < 1) || (jd < Qk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Rk < 1) || (jd < Rk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Sk == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Sk.length != 4) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Tk == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Tk.dt.length == 0) {
      return oc.CLS_E_ILLEGAL;
    }
    var Vk = "";
    var Wk = new mj();
    Vk += Pk;
    Wk.add(Gd(Vk));
    Wk.add([Wc]);
    Vk = "";
    Vk += xd(Qk);
    Vk += xd(Rk);
    Vk += "000";
    Vk += Ad(y, "0000");
    Vk += Ad(x, "0000");
    Vk += Sk;
    Wk.add(Gd(Vk));
    Ok.addD(Wk);
    Tk.add([CR, LF]);
    Ok.addD(Tk);
    return Uk;
  };
  var Xk = function(Yk, Zk, $k, al, bl, id, x, y, cl, dl) {
    var el = oc.CLS_SUCCESS;
    var fl = new mj();
    var gl = new mj();
    if ((dl == null) || (id == null) || (bl == null)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((dl.length <= 0) || (id.length != 3) || (bl.length != 2)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Zk < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < Zk)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (($k < 1) || (jd < $k)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((al < 1) || (jd < al)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((cl < 1) || (999 < cl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    var hl = "";
    hl += "yS";
    hl += bl;
    fl.add(Gd(hl));
    fl.add([CR, LF]);
    hl = "";
    hl += Zk;
    hl += "9";
    hl += xd($k);
    hl += xd(al);
    hl += id.toUpperCase();
    hl += Ad(y, "0000");
    hl += Ad(x, "0000");
    hl += "P";
    hl += Ad(cl, "000");
    hl += "P";
    hl += Ad(cl, "000");
    fl.add(Gd(hl));
    gl.add([CR, LF]);
    Yk.addD(fl);
    Yk.addD(dl);
    Yk.addD(gl);
    return el;
  };
  var il = function(jl, kl, ll, ml, nl, ol, x, y, pl, ql) {
    var rl = oc.CLS_SUCCESS;
    var sl = new mj();
    var tl = new mj();
    if ((typeof(jl) === "undefined") || (typeof(kl) === "undefined") || (typeof(ll) === "undefined") || (typeof(ml) ===
        "undefined") || (typeof(nl) === "undefined") || (typeof(ol) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined") || (typeof(pl) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((kl < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < kl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((ml < 0) || (ld < ml)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((nl < 0) || (ld < nl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((ol < 0) || (md < ol)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    var ul = "";
    ul += kl;
    ul += ll;
    ul += xd(ml);
    ul += xd(nl);
    ul += Ad(ol, "000");
    ul += Ad(y, "0000");
    ul += Ad(x, "0000");
    sl.add(Gd(ul));
    if (typeof(ql) != "undefined") sl.add(ql.dt);
    tl.add([CR, LF]);
    jl.addD(sl);
    jl.addD(pl);
    jl.addD(tl);
    return rl;
  };
  var vl = function(wl, xl, yl, zl) {
    var Al = oc.CLS_SUCCESS;
    var Bl = new mj();
    var Cl = "";
    if ((typeof(wl) === "undefined") || (typeof(xl) === "undefined") || (typeof(yl) === "undefined") || (typeof(zl) ===
        "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (yl == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (yl.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (zl == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (yl.length > kd) {
      return oc.CLS_E_ILLEGAL;
    }
    Bl.add([Vc, Wc]);
    Bl.add(Gd("G0"));
    Bl.add([CR, LF]);
    Bl.add([Vc]);
    Cl += "I";
    if (xl == nd) {
      Cl += "D";
    } else {
      Cl += "G";
    }
    Cl += "B";
    Cl += yl;
    Bl.add(Gd(Cl));
    Bl.add([CR, LF]);
    Bl.add(zl);
    Bl.add([CR, LF]);
    wl.addS(Bl);
    return Al;
  };
  var Dl = function(El, Fl, Gl, Hl, x, y, Il) {
    var Jl = oc.CLS_SUCCESS;
    var Kl = new mj();
    if ((typeof(El) === "undefined") || (typeof(Fl) === "undefined") || (typeof(Gl) === "undefined") || (typeof(Hl) ===
        "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(Il) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Fl < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < Fl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Gl < 1) || (jd < Gl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Hl < 1) || (jd < Hl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Il == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Il.length <= 0) || (Il.length > kd)) {
      return oc.CLS_E_ILLEGAL;
    }
    var Ll = he(Il);
    if (Ll == false) {
      return oc.CLS_E_ILLEGAL;
    }
    var Ml = "";
    Ml += Fl;
    Ml += "Y";
    Ml += xd(Gl);
    Ml += xd(Hl);
    Ml += "000";
    Ml += Ad(y, "0000");
    Ml += Ad(x, "0000");
    Ml += Il;
    Kl.add(Gd(Ml));
    Kl.add([CR, LF]);
    El.addD(Kl);
    return Jl;
  };
  var Nl = function(Ol, Pl, Ql, Rl) {
    var Sl = oc.CLS_SUCCESS;
    var Tl = 0;
    var Ul = new mj();
    if ((typeof(Ol) === "undefined") || (typeof(Pl) === "undefined") || (typeof(Ql) === "undefined") || (typeof(Rl) ===
        "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Array.isArray(Ql) != true) || (Array.isArray(Rl) != true)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Ql.length < gd) || (Rl.length < gd)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Ql.length != Rl.length) {
      return oc.CLS_E_ILLEGAL;
    }
    for (Tl = 0; Tl < Rl.length; Tl++) {
      if ((Rl[Tl] < 0) || (dd < Rl[Tl])) {
        return oc.CLS_E_ILLEGAL;
      }
    }
    for (Tl = 0; Tl < Ql.length; Tl++) {
      if ((Ql[Tl] < 0) || (ed < Ql[Tl])) {
        return oc.CLS_E_ILLEGAL;
      }
    }
    if ((Pl < oc.CLS_SHADED_PTN_0) || (oc.CLS_SHADED_PTN_11 < Pl)) {
      return oc.CLS_E_ILLEGAL;
    }
    var Vl = "";
    Vl += "1X11";
    Vl += Ad(Pl, "000");
    Vl += Ad(Rl[0], "0000");
    Vl += Ad(Ql[0], "0000");
    Vl += "P";
    Vl += "001";
    Vl += "0001";
    var Wl = Ql.length;
    for (Tl = 1; Tl < Wl; Tl++) {
      Vl += Ad(Rl[Tl], "0000");
      Vl += Ad(Ql[Tl], "0000");
    }
    Ul.add(Gd(Vl));
    Ul.add([CR, LF]);
    Ol.addD(Ul);
    return Sl;
  };
  var Xl = function(Yl, x, y, Zl, $l) {
    var am = oc.CLS_SUCCESS;
    var bm = new mj();
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Zl < 0) || (ed < Zl)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (($l < 0) || (dd < $l)) {
      return oc.CLS_E_ILLEGAL;
    }
    var cm = "";
    cm += "1X11";
    cm += "000";
    cm += Ad(y, "0000");
    cm += Ad(x, "0000");
    cm += "l";
    cm += Ad(Zl, "0000");
    cm += Ad($l, "0000");
    bm.add(Gd(cm));
    bm.add([CR, LF]);
    Yl.addD(bm);
    return am;
  };
  var dm = function(em, fm, gm, hm, im, jm, km, lm, x, y) {
    var mm = oc.CLS_SUCCESS;
    var nm = new mj();
    if ((typeof(em) === "undefined") || (typeof(fm) === "undefined") || (typeof(gm) === "undefined") || (typeof(hm) ===
        "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((fm == null)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((fm.length <= 0)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((gm < oc.CLS_LOCALE_JP) || (oc.CLS_LOCALE_KR < gm)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((hm < oc.CLS_PRT_FNT_0) || (oc.CLS_PRT_FNT_KANJIT < hm)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((hm == oc.CLS_PRT_FNT_TRIUMVIRATE) || (hm == oc.CLS_PRT_FNT_TRIUMVIRATE_B)) {
      gm = oc.CLS_LOCALE_OTHER;
    }
    var om = new Array(1);
    mm = dk(hm, lm, om, gm);
    if (mm != oc.CLS_SUCCESS) {
      return mm;
    }
    var pm = Fj(fm, gm, hm);
    switch (hm) {
      case oc.CLS_PRT_FNT_0:
      case oc.CLS_PRT_FNT_1:
      case oc.CLS_PRT_FNT_2:
      case oc.CLS_PRT_FNT_3:
      case oc.CLS_PRT_FNT_4:
      case oc.CLS_PRT_FNT_5:
      case oc.CLS_PRT_FNT_6:
      case oc.CLS_PRT_FNT_7:
      case oc.CLS_PRT_FNT_8:
        mm = Ck(em, im, hm, jm, km, om[0], x, y, pm);
        break;
      case oc.CLS_PRT_FNT_TRIUMVIRATE:
      case oc.CLS_PRT_FNT_TRIUMVIRATE_B:
        mm = Ck(em, im, oc.CLS_PRT_FNT_TRIUMVIRATE, jm, km, om[0], x, y, pm);
        break;
      case oc.CLS_PRT_FNT_KANJI:
        mm = Nk(em, im, jm, km, x, y, om[0], pm);
        break;
      case oc.CLS_PRT_FNT_KANJIT:
        mm = Nk(em, im, jm, km, x, y, om[0], pm);
        break;
      default:
        break;
    }
    return mm;
  };
  var qm = function(rm, sm, tm, um, vm, wm, xm, ym, x, y) {
    var zm = oc.CLS_SUCCESS;
    if ((typeof(rm) === "undefined") || (typeof(sm) === "undefined") || (typeof(tm) === "undefined") || (typeof(um) ===
        "undefined") || (typeof(vm) === "undefined") || (typeof(wm) === "undefined") || (typeof(xm) === "undefined") ||
      (typeof(ym) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((sm == null) || (um == null)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((sm.length <= 0) || (um.length <= 0)) {
      return oc.CLS_E_ILLEGAL;
    }
    var Am = new Array(1);
    Am[0] = "";
    zm = xj(tm, Am);
    if (zm != oc.CLS_SUCCESS) {
      return zm;
    }
    var Bm = new mj(Am[0]);
    if (um.search(/^[0-9]+$/) == -1) {
      var Cm = new Array(1);
      Cm[0] = "";
      if (Bj(tm, Cm) == false) {
        return oc.CLS_E_ILLEGAL;
      }
      Bm.add(Id(sm));
      zm = Xk(rm, vm, wm, xm, Cm[0], um, x, y, ym, Bm);
    } else {
      Bm.add(Id(sm));
      zm = Ck(rm, vm, oc.CLS_PRT_FNT_TRIUMVIRATE, wm, xm, um, x, y, Bm);
    }
    return zm;
  };
  var Dm = function(Em, Fm, Gm, Hm, Im, Jm, Km, x, y, Lm) {
    var Mm = oc.CLS_SUCCESS;
    var Nm = new mj();
    if ((typeof(Em) === "undefined") || (typeof(Fm) === "undefined") || (typeof(Gm) === "undefined") || (typeof(Hm) ===
        "undefined") || (typeof(Im) === "undefined") || (typeof(Jm) === "undefined") || (typeof(Km) === "undefined") ||
      (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(Lm) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Fm == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Fm.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Gm < oc.CLS_BCS_CODE39) || (oc.CLS_BCS_TELEPEN < Gm)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Im < 1) || (ld < Im)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Jm < 1) || (ld < Jm)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Km < 1) || (md < Km)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Lm < oc.CLS_BCS_TEXT_HIDE) || (oc.CLS_BCS_TEXT_SHOW < Lm)) {
      return oc.CLS_E_ILLEGAL;
    }
    Mm = kk(Fm, Gm, Nm);
    if (Mm != oc.CLS_SUCCESS) {
      return Mm;
    }
    var Om = qk(Gm, Lm);
    Mm = il(Em, Hm, Om, Im, Jm, Km, x, y, Nm);
    return Mm;
  };
  var Pm = function(Qm, Rm, Sm, x, y) {
    var Tm = oc.CLS_SUCCESS;
    var Um = 0;
    var Vm = new mj();
    if ((typeof(Qm) === "undefined") || (typeof(Rm) === "undefined") || (typeof(Sm) === "undefined") || (typeof(x) ===
        "undefined") || (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Array.isArray(Rm) != true) {
      return oc.CLS_E_ILLEGAL;
    }
    for (Um = 0; Um < Rm.length; Um++) {
      if (Rm[Um] == null) {
        return oc.CLS_E_ILLEGAL;
      }
      if (Rm[Um].length <= 0) {
        return oc.CLS_E_ILLEGAL;
      }
    }
    Vm.add(Gd("[)>"));
    Vm.add([RS]);
    Vm.add(Gd("01"));
    Vm.add([GS]);
    Vm.add(Gd("00"));
    var Wm = 0;
    var Xm = false;
    for (Um = 0; Um < Rm.length; Um++) {
      Xm = he(Rm[Um]);
      if (Xm == false) {
        return oc.CLS_E_ILLEGAL;
      }
      if (Wm > 1) {
        Vm.add([GS]);
      }
      Vm.add(Gd(Rm[Um]));
      Wm++;
    }
    Vm.add([GS]);
    Vm.add([Zc]);
    Tm = il(Qm, Sm, "u", 7, 7, 0, x, y, Vm);
    return Tm;
  };
  var Ym = function(Zm, $m, an, bn, cn, dn, x, y) {
    var en = oc.CLS_SUCCESS;
    var fn = new mj();
    if ((typeof(Zm) === "undefined") || (typeof($m) === "undefined") || (typeof(an) === "undefined") || (typeof(bn) ===
        "undefined") || (typeof(cn) === "undefined") || (typeof(dn) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ($m == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if ($m.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((cn < 1) || (5 < cn)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((dn < oc.CLS_PDF417_EC_LEVEL_0) || (oc.CLS_PDF417_EC_LEVEL_8 < dn)) {
      return oc.CLS_E_ILLEGAL;
    }
    var gn = "";
    gn += "F";
    gn += dn;
    gn += "00";
    gn += "00";
    gn += "01";
    fn.add(Gd(gn));
    var hn = new Array(1);
    hn[0] = "";
    en = xj(an, hn);
    if (en != oc.CLS_SUCCESS) {
      return en;
    }
    var jn = new mj(hn[0]);
    jn.add(Id($m));
    en = il(Zm, bn, "z", cn, cn * 3, cn * 3, x, y, jn, fn);
    return en;
  };
  var kn = function(ln, mn, nn, on, pn, qn, x, y) {
    var rn = oc.CLS_SUCCESS;
    var sn = 0;
    var tn = new mj();
    if ((typeof(ln) === "undefined") || (typeof(mn) === "undefined") || (typeof(nn) === "undefined") || (typeof(on) ===
        "undefined") || (typeof(pn) === "undefined") || (typeof(qn) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (mn == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (mn.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((pn < 1) || (15 < pn)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (qn != oc.CLS_DATAMATRIX_EC_LEVEL_200) {
      return oc.CLS_E_ILLEGAL;
    }
    sn = uk(mn);
    if (sn <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    var un = "";
    un += Ad(qn, "000");
    un += "0";
    un += Ad(sn, "000");
    un += Ad(sn, "000");
    tn.add(Gd(un));
    var vn = new Array(1);
    vn[0] = "";
    rn = xj(nn, vn);
    if (rn != oc.CLS_SUCCESS) {
      return rn;
    }
    var wn = new mj(vn[0]);
    wn.add(Id(mn));
    rn = il(ln, on, "W1c", pn, pn, 0, x, y, wn, tn);
    return rn;
  };
  var xn = function(yn, zn, An, Bn, Cn, Dn, x, y) {
    var En = oc.CLS_SUCCESS;
    var Fn = "";
    var Gn = new mj();
    if ((typeof(yn) === "undefined") || (typeof(zn) === "undefined") || (typeof(An) === "undefined") || (typeof(Bn) ===
        "undefined") || (typeof(Cn) === "undefined") || (typeof(Dn) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (zn == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (zn.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Cn < 1) || (15 < Cn)) {
      return oc.CLS_E_ILLEGAL;
    }
    switch (Dn) {
      case oc.CLS_QRCODE_EC_LEVEL_L:
        Fn = "L";
        break;
      case oc.CLS_QRCODE_EC_LEVEL_M:
        Fn = "M";
        break;
      case oc.CLS_QRCODE_EC_LEVEL_Q:
        Fn = "Q";
        break;
      case oc.CLS_QRCODE_EC_LEVEL_H:
        Fn = "H";
        break;
      default:
        Fn = "";
        break;
    }
    if (Fn == "") {
      return oc.CLS_E_ILLEGAL;
    }
    var Hn = "";
    Hn += "2,";
    Hn += Fn;
    Hn += "A,";
    Gn.add(Gd(Hn));
    var In = new Array(1);
    In[0] = "";
    En = xj(An, In);
    if (En != oc.CLS_SUCCESS) {
      return En;
    }
    var Jn = new mj(In[0]);
    Jn.add(Id(zn));
    En = il(yn, Bn, "W1D", Cn, Cn, 0, x, y, Jn, Gn);
    return En;
  };
  var Kn = function(Ln, Mn, Nn, On, Pn, Qn, x, y) {
    var Rn = oc.CLS_SUCCESS;
    var Sn = new mj();
    if ((typeof(Ln) === "undefined") || (typeof(Mn) === "undefined") || (typeof(Nn) === "undefined") || (typeof(On) ===
        "undefined") || (typeof(Pn) === "undefined") || (typeof(Qn) === "undefined") || (typeof(x) === "undefined") ||
      (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Mn == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Mn.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Pn < 0) || (15 < Pn)) {
      return oc.CLS_E_ILLEGAL;
    }
    switch (Qn) {
      case oc.CLS_AXTEC_EC_LEVEL_000:
        break;
      default:
        return oc.CLS_E_ILLEGAL;
    }
    var Tn = "";
    Tn += "0";
    Tn += Ad(Qn, "000");
    Sn.add(Gd(Tn));
    var Un = new Array(1);
    Un[0] = "";
    Rn = xj(Nn, Un);
    if (Rn != oc.CLS_SUCCESS) {
      return Rn;
    }
    var Vn = new mj(Un[0]);
    Vn.add(Id(Mn));
    Rn = il(Ln, On, "W1f", Pn, Pn, 0, x, y, Vn, Sn);
    return Rn;
  };
  var Wn = function(Xn, Yn, Zn, $n, ao, x, y) {
    var bo = oc.CLS_SUCCESS;
    var co = 0;
    var eo = new mj();
    if ((typeof(Xn) === "undefined") || (typeof(Yn) === "undefined") || (typeof(Zn) === "undefined") || (typeof($n) ===
        "undefined") || (typeof(ao) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Array.isArray(Yn) != true) {
      return oc.CLS_E_ILLEGAL;
    }
    for (co = 0; co < Yn.length; co++) {
      if (Yn[co] == null) {
        return oc.CLS_E_ILLEGAL;
      }
      if (Yn[co].length <= 0) {
        return oc.CLS_E_ILLEGAL;
      }
    }
    var fo = new Array(1);
    fo[0] = "";
    bo = yk(Zn, fo);
    if (bo != oc.CLS_SUCCESS) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((ao < 1) || (15 < ao)) {
      return oc.CLS_E_ILLEGAL;
    }
    var go = "";
    go += fo[0];
    var ho = false;
    var io = false;
    for (co = 0; co < Yn.length; co++) {
      io = he(Yn[co]);
      if (io == false) {
        return oc.CLS_E_ILLEGAL;
      }
      if (ho == true) {
        go += '|';
      }
      go += Yn[co];
      ho = true;
    }
    eo.add(Gd(go));
    bo = il(Xn, $n, "W1k", ao, ao, 0, x, y, eo);
    return bo;
  };
  var jo = function(ko, lo, mo, no, oo, po) {
    var qo = oc.CLS_SUCCESS;
    var ro;
    var so = new Array(0, 0);
    if ((typeof(ko) === "undefined") || (typeof(lo) === "undefined") || (typeof(mo) === "undefined") || (typeof(no) ===
        "undefined") || (typeof(oo) === "undefined") || (typeof(po) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((lo == null) || (mo == null)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (mo.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (mo.search(/[\\\/:*?\"<>|]/) != -1) {
      return oc.CLS_E_ILLEGAL;
    }
    if (mo.charAt(0) == "_") {
      return oc.CLS_E_ILLEGAL;
    }
    if ((no < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < no)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (oo < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (po < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    try {
      ro = Ci(lo, no, oo, po, so);
    } catch (e) {
      return oc.CLS_E_ILLEGAL;
    }
    qo = vl(ko, od, mo, ro);
    return qo;
  };
  var uo = function(vo, wo, xo, yo, x, y) {
    var zo = oc.CLS_SUCCESS;
    if ((typeof(vo) === "undefined") || (typeof(wo) === "undefined") || (typeof(xo) === "undefined") || (typeof(yo) ===
        "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (wo == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (wo.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (wo.search(/[\\\/:*?\"<>|]/) != -1) {
      return oc.CLS_E_ILLEGAL;
    }
    if (wo.charAt(0) == "_") {
      return oc.CLS_E_ILLEGAL;
    }
    zo = Dl(vo, oc.CLS_RT_NORMAL, xo, yo, x, y, wo);
    return zo;
  };
  var Ao = function(Bo, Co, Do, Eo, Fo, x, y, Go, Ho) {
    var Io = oc.CLS_SUCCESS;
    var Jo;
    var Ko = new Array(0, 0);
    if ((typeof(Bo) === "undefined") || (typeof(Co) === "undefined") || (typeof(Do) === "undefined") || (typeof(Eo) ===
        "undefined") || (typeof(Fo) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") ||
      (typeof(Go) === "undefined") || (typeof(Ho) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Co == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Do < oc.CLS_RT_NORMAL) || (oc.CLS_RT_LEFT90 < Do)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Eo < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Fo < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Go < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Ho != oc.CLS_UNIT_INCH) && (Ho != oc.CLS_UNIT_MILLI)) {
      return oc.CLS_E_ILLEGAL;
    }
    try {
      Jo = Ci(Co, Do, Eo, Fo, Ko);
    } catch (e) {
      return oc.CLS_E_ILLEGAL;
    }
    var Lo = new Array(0, 0);
    var Mo = new Array(x, y);
    var No = new Array(0, 0);
    var Oo = true;
    var Po = (Ho == oc.CLS_UNIT_MILLI) ? pd.Metric : pd.English;
    var Qo = (Go == oc.CLS_PRT_RES_300) ? pd.Dots300 : pd.Dots203;
    Lo[0] = qd(Qo, Po, Ko[0]);
    Lo[1] = qd(Qo, Po, Ko[1]);
    Yd(Lo, Do, Mo, No, Oo);
    var Ro = "_tmp" + Ad(Bo.bno, "000000000000");
    Bo.bno++;
    Io = vl(Bo, nd, Ro, Jo);
    if (Io != 0) return Io;
    Io = Dl(Bo, oc.CLS_RT_NORMAL, 1, 1, No[0], No[1], Ro);
    return Io;
  };
  var So = function(To, x1, y1, x2, y2, Uo) {
    var Vo = oc.CLS_SUCCESS;
    var Wo = 0;
    if ((typeof(To) === "undefined") || (typeof(x1) === "undefined") || (typeof(y1) === "undefined") || (typeof(x2) ===
        "undefined") || (typeof(y2) === "undefined") || (typeof(Uo) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (x1 < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (y1 < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (x2 < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if (y2 < 0) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Uo < 0) || (hd < Uo)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Uo > 0) {
      var Xo = Uo / 2;
      Wo = Math.round(Xo);
    }
    if ((x1 == x2) || (y1 == y2)) {
      var x = 0;
      var y = 0;
      var xt = 0;
      var yt = 0;
      if (x1 == x2) {
        if ((Uo == 0) || (Uo == 1)) {
          x = x1;
        } else {
          x = x1 - Wo + 1;
        }
        y = Math.min(y1, y2);
        xt = Uo;
        yt = Math.abs(y2 - y1) + 1;
        if (yt > dd) {
          yt = dd;
        }
      }
      if (y1 == y2) {
        x = Math.min(x1, x2);
        if ((Uo == 0) || (Uo == 1)) {
          y = y1;
        } else {
          y = y1 - Wo + 1;
        }
        xt = Math.abs(x2 - x1) + 1;
        if (xt > ed) {
          xt = ed;
        }
        yt = Uo;
      }
      Vo = Xl(To, x, y, xt, yt);
    } else {
      var Yo = new Array(4);
      var Zo = new Array(4);
      var $o = Math.PI / 2;
      var ap = 0;
      var bp = 0;
      var dp = 0;
      var ep = 0;
      var fp = 0;
      var gp = 0;
      var hp = 0;
      var ip = 0;
      var jp = 0;
      var kp = 0;
      var lp = 0;
      if ((Uo == 0) || (Uo == 1)) {
        bp = x1;
        dp = y1;
        ep = x2;
        fp = y2;
        gp = x2;
        hp = y2;
        ip = x1;
        jp = y1;
      } else {
        if (Uo % 2 == 0) {
          kp = 0;
          lp = 1;
        } else {
          kp = 1;
          lp = 1;
        }
        var mp = Math.atan2(x2 - x1, y2 - y1);
        var np = $o + ($o - mp);
        var op = ap - mp;
        bp = Math.cos(np) * (Wo - kp) + x1;
        dp = Math.sin(np) * (Wo - kp) + y1;
        ep = Math.cos(op) * (Wo - lp) + x1;
        fp = Math.sin(op) * (Wo - lp) + y1;
        gp = Math.cos(op) * (Wo - lp) + x2;
        hp = Math.sin(op) * (Wo - lp) + y2;
        ip = Math.cos(np) * (Wo - kp) + x2;
        jp = Math.sin(np) * (Wo - kp) + y2;
      }
      Yo[0] = Math.round(bp);
      Zo[0] = Math.round(dp);
      Yo[1] = Math.round(ep);
      Zo[1] = Math.round(fp);
      Yo[2] = Math.round(gp);
      Zo[2] = Math.round(hp);
      Yo[3] = Math.round(ip);
      Zo[3] = Math.round(jp);
      Vo = Nl(To, oc.CLS_SHADED_PTN_1, Yo, Zo);
    }
    return Vo;
  };
  var pp = function(qp, x, y, rp, sp, tp) {
    var up = oc.CLS_SUCCESS;
    var vp = new mj();
    if ((typeof(qp) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(rp) ===
        "undefined") || (typeof(sp) === "undefined") || (typeof(tp) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((rp < 0) || (ed < rp)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((sp < 0) || (dd < sp)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((tp < oc.CLS_SHADED_PTN_0) || (oc.CLS_SHADED_PTN_11 < tp)) {
      return oc.CLS_E_ILLEGAL;
    }
    var wp = new Array(4);
    var xp = new Array(4);
    wp[0] = x;
    wp[1] = x;
    wp[2] = x + rp;
    wp[3] = x + rp;
    xp[0] = y;
    xp[1] = y + sp;
    xp[2] = y + sp;
    xp[3] = y;
    up = Nl(qp, tp, wp, xp);
    return up;
  };
  var yp = function(zp, x, y, Ap, Bp, Cp, Dp) {
    var Ep = oc.CLS_SUCCESS;
    var Fp = new mj();
    if ((typeof(zp) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(Ap) ===
        "undefined") || (typeof(Bp) === "undefined") || (typeof(Cp) === "undefined") || (typeof(Dp) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Ap < 0) || (ed < Ap)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Bp < 0) || (dd < Bp)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Cp < 0) || (hd < Cp)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Dp < 0) || (hd < Dp)) {
      return oc.CLS_E_ILLEGAL;
    }
    var Gp = "";
    Gp += "1X11";
    Gp += "000";
    Gp += Ad(y, "0000");
    Gp += Ad(x, "0000");
    Gp += "b";
    Gp += Ad(Ap, "0000");
    Gp += Ad(Bp, "0000");
    Gp += Ad(Cp, "0000");
    Gp += Ad(Dp, "0000");
    Fp.add(Gd(Gp));
    Fp.add([CR, LF]);
    zp.addD(Fp);
    return Ep;
  };
  var Hp = function(Ip, x, y, Jp, Kp) {
    var Lp = oc.CLS_SUCCESS;
    var Mp = new mj();
    if ((typeof(Ip) === "undefined") || (typeof(x) === "undefined") || (typeof(y) === "undefined") || (typeof(Jp) ===
        "undefined") || (typeof(Kp) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((x < 0) || (ed < x)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((y < 0) || (dd < y)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Jp < 0) || (fd < Jp)) {
      return oc.CLS_E_ILLEGAL;
    }
    if ((Kp < oc.CLS_SHADED_PTN_0) || (oc.CLS_SHADED_PTN_11 < Kp)) {
      return oc.CLS_E_ILLEGAL;
    }
    var Np = "";
    Np += "1X11";
    Np += Ad(Kp, "000");
    Np += Ad(y, "0000");
    Np += Ad(x, "0000");
    Np += "C";
    Np += "001";
    Np += "0001";
    Np += Ad(Jp, "0000");
    Mp.add(Gd(Np));
    Mp.add([CR, LF]);
    Ip.addD(Mp);
    return Lp;
  };
  var Op = 9999;
  var Pp = 9999;
  var Qp = 9999;
  var Rp = 30;
  var Sp = 220;
  var Tp = 813;
  var Up = 9999;
  var Vp = (function() {
    var Vp = function() {
      this.hMg = 1;
      this.vMg = 1;
      this.mHd = oc.CLS_PROPERTY_DEFAULT;
      this.fmtAttr = oc.CLS_PROPERTY_DEFAULT;
      this.cML = oc.CLS_PROPERTY_DEFAULT;
      this.mUt = oc.CLS_PROPERTY_DEFAULT;
      this.pSpd = oc.CLS_PROPERTY_DEFAULT;
      this.fSpd = oc.CLS_PROPERTY_DEFAULT;
      this.sSpd = oc.CLS_PROPERTY_DEFAULT;
      this.bSpd = oc.CLS_PROPERTY_DEFAULT;
      this.pDkns = oc.CLS_PROPERTY_DEFAULT;
      this.dHt = oc.CLS_PROPERTY_DEFAULT;
      this.vOfst = oc.CLS_PROPERTY_DEFAULT;
      this.hOfst = oc.CLS_PROPERTY_DEFAULT;
      this.stOfst = oc.CLS_PROPERTY_DEFAULT;
      this.spOfst = oc.CLS_PROPERTY_DEFAULT;
      this.lSns = oc.CLS_PROPERTY_DEFAULT;
      this.pMt = oc.CLS_PROPERTY_DEFAULT;
      this.sLctn = oc.CLS_PROPERTY_DEFAULT;
      this.stCIIA = oc.CLS_PROPERTY_DEFAULT;
      this.stPE = oc.CLS_PROPERTY_DEFAULT;
      this.stRE = oc.CLS_PROPERTY_DEFAULT;
      this.stBP = oc.CLS_PROPERTY_DEFAULT;
      this.stPt = oc.CLS_PROPERTY_DEFAULT;
      this.stPs = oc.CLS_PROPERTY_DEFAULT;
      this.stWFP = oc.CLS_PROPERTY_DEFAULT;
    };
    return Vp;
  })();
  var Wp = function(Xp) {
    var Yp = new mj();
    var Zp = Xp.mHd;
    var $p = Xp.lSns;
    var aq = Xp.cML;
    var bq = Xp.pMt;
    var cq = Xp.sLctn;
    var dq = Xp.mUt;
    var eq = Xp.dHt;
    var fq = Xp.fSpd;
    var gq = Xp.stOfst;
    var hq = Xp.spOfst;
    var iq = "";
    Yp.add([0x02, 0x1B, 0x47, 0x30, 0x0D, 0x0A]);
    switch (Zp) {
      case oc.CLS_MEDIAHANDLING_NONE:
        Yp.add([0x02, 0x56, 0x30, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_TEAROFF:
        Yp.add([0x02, 0x56, 0x30, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x31, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_DISPENSES:
        Yp.add([0x02, 0x56, 0x34, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x31, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_PAUSE:
        Yp.add([0x02, 0x56, 0x30, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x31, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_CUT:
        Yp.add([0x02, 0x56, 0x31, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_CUTANDPAUSE:
        Yp.add([0x02, 0x56, 0x31, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_PEELOFF:
        Yp.add([0x02, 0x56, 0x34, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_MEDIAHANDLING_REWIND:
        Yp.add([0x02, 0x56, 0x30, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x74, 0x30, 0x0D, 0x0A]);
        Yp.add([0x02, 0x1B, 0x72, 0x0D, 0x0A]);
        break;
      default:
        break;
    }
    switch ($p) {
      case oc.CLS_SELSENSOR_SEETHROUGH:
        Yp.add([0x02, 0x65, 0x0D, 0x0A]);
        Yp.add([0x02, 0x63, 0x30, 0x30, 0x30, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_SELSENSOR_REFLECT:
        Yp.add([0x02, 0x72, 0x0D, 0x0A]);
        Yp.add([0x02, 0x63, 0x30, 0x30, 0x30, 0x30, 0x0D, 0x0A]);
        break;
      case oc.CLS_SELSENSOR_NONE:
      case oc.CLS_PROPERTY_DEFAULT:
        if (aq != oc.CLS_PROPERTY_DEFAULT) {
          Yp.add([0x02, 0x63]);
          iq = Ad(aq, "0000");
          Yp.add(Gd(iq));
          Yp.add([0x0D, 0x0A]);
        }
        break;
    }
    if (bq != oc.CLS_PROPERTY_DEFAULT) {
      if (bq == oc.CLS_PRTMETHOD_TT) {
        Yp.add([0x02, 0x1B, 0x4D, 0x54, 0x0D, 0x0A]);
      } else {
        Yp.add([0x02, 0x1B, 0x4D, 0x44, 0x0D, 0x0A]);
      }
    }
    if (cq != oc.CLS_PROPERTY_DEFAULT) {
      Yp.add([0x02, 0x1B, 0x70]);
      iq = Ad(cq, "0");
      Yp.add(Gd(iq));
      Yp.add([0x0D, 0x0A]);
    }
    if (dq != oc.CLS_PROPERTY_DEFAULT) {
      if (dq == oc.CLS_UNIT_MILLI) {
        Yp.add([0x02, 0x6d, 0x0D, 0x0A]);
      } else {
        Yp.add([0x02, 0x6e, 0x0D, 0x0A]);
      }
    }
    if (eq != oc.CLS_PROPERTY_DEFAULT) {
      Yp.add([0x02, 0x1B, 0x44]);
      iq = Ad(eq, "0");
      Yp.add(Gd(iq));
      Yp.add([0x0D, 0x0A]);
    }
    if (fq != oc.CLS_PROPERTY_DEFAULT) {
      Yp.add([0x02, 0x53]);
      iq = xd(fq);
      Yp.add(Gd(iq));
      Yp.add([0x0D, 0x0A]);
    }
    if (gq != oc.CLS_PROPERTY_DEFAULT) {
      Yp.add([0x02, 0x4F]);
      iq = Ad(gq, "0000");
      Yp.add(Gd(iq));
      Yp.add([0x0D, 0x0A]);
    }
    if (hq != oc.CLS_PROPERTY_DEFAULT) {
      Yp.add([0x02, 0x4B, 0x66]);
      iq = Ad(hq, "0000");
      Yp.add(Gd(iq));
      Yp.add([0x0D, 0x0A]);
    }
    return Yp.get();
  };
  var jq = function(kq) {
    var lq = new mj();
    var mq = kq.hMg;
    var nq = kq.vMg;
    var oq = kq.fmtAttr;
    var pq = kq.pSpd;
    var qq = kq.sSpd;
    var rq = kq.bSpd;
    var sq = kq.pDkns;
    var tq = kq.vOfst;
    var uq = kq.hOfst;
    var vq = "";
    lq.add([0x02, 0x4C, 0x0D, 0x0A]);
    vq = "D";
    vq += Ad(mq, "0");
    vq += Ad(nq, "0");
    lq.add(Gd(vq));
    lq.add([0x0D, 0x0A]);
    if (oq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x1B, 0x42]);
      vq = Ad(oq, "0");
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (pq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x50]);
      vq = xd(pq);
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (qq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x53]);
      vq = xd(qq);
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (rq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x70]);
      vq = xd(rq);
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (sq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x48]);
      vq = Ad(sq, "00");
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (tq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x52]);
      vq = Ad(tq, "0000");
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    if (uq != oc.CLS_PROPERTY_DEFAULT) {
      lq.add([0x43]);
      vq = Ad(uq, "0000");
      lq.add(Gd(vq));
      lq.add([0x0D, 0x0A]);
    }
    return lq.get();
  };
  var wq = function(xq) {
    var yq = new mj();
    var zq = xq.mHd;
    switch (zq) {
      case oc.CLS_MEDIAHANDLING_CUT:
      case oc.CLS_MEDIAHANDLING_CUTANDPAUSE:
        yq.add(Gd(":0001"));
        yq.add([CR, LF]);
        break;
      default:
        break;
    }
    return yq.get();
  };
  var Aq = function(Bq) {
    var Cq = new mj();
    if ((Bq < 1) || (Op < Bq)) {
      return Cq.get();
    }
    var sb = "Q";
    sb += Ad(Bq, "0000");
    Cq.add(Gd(sb));
    Cq.add([CR, LF]);
    return Cq.get();
  };
  var Dq = function(Eq) {
    var Fq = Eq.mHd;
    var Gq = new mj();
    switch (Fq) {
      case oc.CLS_MEDIAHANDLING_PAUSE:
      case oc.CLS_MEDIAHANDLING_CUTANDPAUSE:
        Gq.add([Vc]);
        Gq.add(Gd('p'));
        Gq.add([CR, LF]);
        break;
      default:
        break;
    }
    return Gq.get();
  };
  var Hq = function(Iq, Jq) {
    var Kq;
    var Lq = oc.CLS_SUCCESS;
    if ((typeof(Iq) === "undefined") || (typeof(Jq) === "undefined")) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Jq[0].status.match("Online") != null) {
      Kq = Jq[0].BarcodePrinterStatus;
      Iq.stCIIA = (Kq[0] == "Y") ? 1 : 0;
      Iq.stPE = (Kq[1] == "Y") ? 1 : 0;
      Iq.stRE = (Kq[2] == "Y") ? 1 : 0;
      Iq.stBP = (Kq[3] == "Y") ? 1 : 0;
      Iq.stPt = (Kq[4] == "Y") ? 1 : 0;
      Iq.stPs = (Kq[5] == "Y") ? 1 : 0;
      Iq.stWFP = (Kq[6] == "Y") ? 1 : 0;
    } else {}
    return Lq;
  };
  var Mq = function() {
    this.p = new tj();
  };
  var Nq = Mq.prototype;
  Nq.drawTextPtrFont = function(Oq, Pq, Qq, Rq, Sq, Tq, Uq, x, y) {
    var Vq = this.p;
    return dm(Vq, Oq, Pq, Qq, Rq, Sq, Tq, Uq, x, y);
  };
  Nq.drawTextDLFont = function(Wq, Xq, Yq, Zq, $q, ar, br, x, y) {
    var cr = this.p;
    return qm(cr, Wq, Xq, Yq, Zq, $q, ar, br, x, y);
  };
  Nq.drawBarCode = function(dr, er, fr, gr, hr, ir, x, y, jr) {
    var kr = this.p;
    return Dm(kr, dr, er, fr, gr, hr, ir, x, y, jr);
  };
  Nq.drawMaxiCode = function(lr, mr, x, y) {
    var nr = this.p;
    return Pm(nr, lr, mr, x, y);
  };
  Nq.drawPDF417 = function(or, pr, qr, rr, sr, x, y) {
    var tr = this.p;
    return Ym(tr, or, pr, qr, rr, sr, x, y);
  };
  Nq.drawDataMatrix = function(ur, vr, wr, xr, yr, x, y) {
    var zr = this.p;
    return kn(zr, ur, vr, wr, xr, yr, x, y);
  };
  Nq.drawQRCode = function(Ar, Br, Cr, Dr, Er, x, y) {
    var Fr = this.p;
    return xn(Fr, Ar, Br, Cr, Dr, Er, x, y);
  };
  Nq.drawAztec = function(Gr, Hr, Ir, Jr, Kr, x, y) {
    var Lr = this.p;
    return Kn(Lr, Gr, Hr, Ir, Jr, Kr, x, y);
  };
  Nq.drawGS1DataBar = function(Mr, Nr, Or, Pr, x, y) {
    var Qr = this.p;
    return Wn(Qr, Mr, Nr, Or, Pr, x, y);
  };
  Nq.drawNVBitmap = function(Rr, Sr, Tr, x, y) {
    var Ur = this.p;
    return uo(Ur, Rr, Sr, Tr, x, y);
  };
  Nq.drawBitmap = function(Vr, Wr, Xr, Yr, x, y, Zr, $r) {
    var as = this.p;
    if (typeof(Zr) === "undefined") {
      Zr = oc.CLS_PRT_RES_203;
    }
    if (typeof($r) === "undefined") {
      $r = oc.CLS_UNIT_INCH;
    }
    return Ao(as, Vr, Wr, Xr, Yr, x, y, Zr, $r);
  };
  Nq.drawLine = function(x1, y1, x2, y2, bs) {
    var ds = this.p;
    return So(ds, x1, y1, x2, y2, bs);
  };
  Nq.drawRect = function(x, y, es, fs, gs) {
    var hs = this.p;
    return yp(hs, x, y, es, fs, gs, gs);
  };
  Nq.fillRect = function(x, y, is, js, ks) {
    var ls = this.p;
    return pp(ls, x, y, is, js, ks);
  };
  Nq.drawCircle = function(x, y, ms) {
    var ns = this.p;
    return Hp(ns, x, y, ms, oc.CLS_SHADED_PTN_0);
  };
  Nq.fillCircle = function(x, y, os, ps) {
    var qs = this.p;
    return Hp(qs, x, y, os, ps);
  };
  Nq.drawPolygon = function(rs, ss) {
    var ts = this.p;
    return Nl(ts, oc.CLS_SHADED_PTN_0, rs, ss);
  };
  Nq.fillPolygon = function(us, vs, ws) {
    var xs = this.p;
    return Nl(xs, ws, us, vs);
  };
  Nq.embedRawDesignCommand = function(ys) {
    if (ys == null) {
      return oc.CLS_E_ILLEGAL;
    }
    if (ys.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    command = new mj();
    command.add(ys);
    this.p.addD(command);
    return oc.CLS_SUCCESS;
  };
  var zs = function() {
    this.OnReceive = null;
    this.OnError = null;
    this.adr = null;
    this.mid = null;
    this.cx = null;
    this.p = new Vp();
  };
  var Nq = zs.prototype;
  Nq.messageID = function(As) {
    this.mid = As;
  };
  Nq.printerCheck = function(Bs) {
    var Cs = new citizen.CXMLLabel();
    var Ds = this.OnReceive;
    var Es = this.p;
    if (typeof(Bs) === "undefined") return oc.CLS_E_ILLEGAL;
    if (Bs == null) return oc.CLS_E_ILLEGAL;
    Cs.OnReceive = function(Fs, Gs) {
      Hq(Es, Fs.DeviceInfo);
      if (Ds) Ds(Fs, Gs);
    };
    Cs.OnError = this.OnError;
    Cs.GetDeviceInfo(null, true, true);
    Cs.Send(Bs);
    this.cx = Cs;
    return oc.CLS_SUCCESS;
  };
  Nq.sendData = function(Hs, Is) {
    var Js = new citizen.CXMLLabel();
    var Ks;
    var Ls;
    var Ms = new mj();
    if (typeof(Hs) === "undefined") return oc.CLS_E_ILLEGAL;
    if (Hs == null) return oc.CLS_E_ILLEGAL;
    if (typeof(Is) === "undefined") return oc.CLS_E_ILLEGAL;
    if (Is == null) return oc.CLS_E_ILLEGAL;
    if (Is.length == 0) return oc.CLS_E_ILLEGAL;
    Js.OnReceive = this.OnReceive;
    Js.OnError = this.OnError;
    Js.MessageID(this.mid);
    Ms.add(Is);
    Ks = Ms.get();
    Ls = Oe(Ks);
    Js.SendData(Ls);
    Js.Send(Hs);
    this.cx = Js;
    return oc.CLS_SUCCESS;
  };
  Nq.print = function(Ns, Os, Ps) {
    var Qs = new citizen.CXMLLabel();
    var Rs = this.p;
    var Ss;
    var Ts;
    var Us;
    var Vs;
    var Ws;
    var Xs = new mj();
    if (typeof(Ns) === "undefined") return oc.CLS_E_ILLEGAL;
    if (typeof(Os) === "undefined") return oc.CLS_E_ILLEGAL;
    if (typeof(Ps) === "undefined") return oc.CLS_E_ILLEGAL;
    if (Ns == null) return oc.CLS_E_ILLEGAL;
    Ts = Os.p.sc;
    Ss = Os.p.dc;
    if (Ss.length == 0) return oc.CLS_E_ILLEGAL;
    Qs.OnReceive = this.OnReceive;
    Qs.OnError = this.OnError;
    Qs.MessageID(this.mid);
    Us = Wp(Rs);
    Vs = Oe(Us);
    Qs.SendData(Vs);
    for (Ws = 0; Ws < Ts.length; Ws++) {
      Us = Ts[Ws].dt;
      Vs = Oe(Us);
      var encode = Ts[Ws].ec;
      Qs.SendData(Vs, encode);
    }
    Us = jq(Rs);
    Vs = Oe(Us);
    Qs.SendData(Vs);
    for (Ws = 0; Ws < Ss.length; Ws++) {
      Us = Ss[Ws].dt;
      Vs = Oe(Us);
      var encode = Ss[Ws].ec;
      Qs.SendData(Vs, encode);
    }
    Xs.add(wq(Rs));
    var Ys = Aq(Ps);
    if (Ys.length <= 0) {
      return oc.CLS_E_ILLEGAL;
    }
    Xs.add(Ys);
    Xs.add(Gd("E"));
    Xs.add([CR, LF]);
    Xs.add(Dq(Rs));
    Us = Xs.get();
    Vs = Oe(Us);
    Qs.SendData(Vs);
    Qs.Send(Ns);
    this.cx = Qs;
    return oc.CLS_SUCCESS;
  };
  Nq.storeNVBitmap = function(Zs, $s, at, bt, ct, et) {
    var ft = new citizen.CXMLLabel();
    var gt = this.p;
    var ht;
    var it;
    var jt;
    var kt;
    var lt = new mj();
    var mt = oc.CLS_SUCCESS;
    if (typeof($s) === "undefined") return oc.CLS_E_ILLEGAL;
    if ($s == null) return oc.CLS_E_ILLEGAL;
    var nt = new Mq();
    mt = jo(nt.p, Zs, at, bt, ct, et);
    if (mt != oc.CLS_SUCCESS) {
      return mt;
    }
    ht = nt.p.sc;
    if (ht.length == 0) {
      return oc.CLS_E_ILLEGAL;
    }
    ft.OnReceive = this.OnReceive;
    ft.OnError = this.OnError;
    ft.MessageID(this.mid);
    it = Wp(gt);
    jt = Oe(it);
    ft.SendData(jt);
    for (kt = 0; kt < ht.length; kt++) {
      it = ht[kt].dt;
      jt = Oe(it);
      var encode = ht[kt].ec;
      ft.SendData(jt, encode);
    }
    ft.Send($s);
    this.cx = ft;
    return oc.CLS_SUCCESS;
  };
  Nq.clearOutput = function(ot) {
    var pt = new citizen.CXMLLabel();
    var qt = this.p;
    var rt;
    var st;
    var tt = new mj();
    var ut = oc.CLS_SUCCESS;
    if (typeof(ot) === "undefined") return oc.CLS_E_ILLEGAL;
    if (ot == null) return oc.CLS_E_ILLEGAL;
    pt.OnReceive = this.OnReceive;
    pt.OnError = this.OnError;
    pt.MessageID(this.mid);
    tt.add([0x01, 0x23, 0x0D, 0x0A]);
    rt = tt.get();
    st = Oe(rt);
    pt.SendData(st);
    pt.Send(ot);
    this.cx = pt;
    return oc.CLS_SUCCESS;
  };
  Nq.setHorizontalMagnification = function(vt) {
    var wt = this.p;
    if ((vt < 1) || (2 < vt)) {
      return oc.CLS_E_ILLEGAL;
    }
    wt.hMg = vt;
    return oc.CLS_SUCCESS;
  };
  Nq.getHorizontalMagnification = function() {
    var zt = this.p;
    var At = zt.hMg;
    return At;
  };
  Nq.setVerticalMagnification = function(Bt) {
    var Ct = this.p;
    if ((Bt < 1) || (3 < Bt)) {
      return oc.CLS_E_ILLEGAL;
    }
    Ct.vMg = Bt;
    return oc.CLS_SUCCESS;
  };
  Nq.getVerticalMagnification = function() {
    var Dt = this.p;
    var Et = Dt.vMg;
    return Et;
  };
  Nq.setFormatAttribute = function(Ft) {
    var Gt = this.p;
    if (((Ft < 0) || (1 < Ft)) && (Ft != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Gt.fmtAttr = Ft;
    return oc.CLS_SUCCESS;
  };
  Nq.getFormatAttribute = function() {
    var Ht = this.p;
    var It = Ht.fmtAttr;
    return It;
  };
  Nq.setContinuousMediaLength = function(Jt) {
    var Kt = this.p;
    if (((Jt < 1) || (Pp < Jt)) && (Jt != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Kt.cML = Jt;
    return oc.CLS_SUCCESS;
  };
  Nq.getContinuousMediaLength = function() {
    var Lt = this.p;
    var Mt = Lt.cML;
    return Mt;
  };
  Nq.setMeasurementUnit = function(Nt) {
    var Ot = this.p;
    if (((Nt < oc.CLS_UNIT_MILLI) || (oc.CLS_UNIT_INCH < Nt)) && (Nt != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Ot.mUt = Nt;
    return oc.CLS_SUCCESS;
  };
  Nq.getMeasurementUnit = function() {
    var Pt = this.p;
    var Qt = Pt.mUt;
    return Qt;
  };
  Nq.setPrintSpeed = function(Rt) {
    var St = this.p;
    if (((Rt < oc.CLS_SPEEDSETTING_1) || (oc.CLS_SPEEDSETTING_X < Rt)) && (Rt != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    St.pSpd = Rt;
    return oc.CLS_SUCCESS;
  };
  Nq.getPrintSpeed = function() {
    var Tt = this.p;
    var Ut = Tt.pSpd;
    return Ut;
  };
  Nq.setFeedSpeed = function(Vt) {
    var Wt = this.p;
    if (((Vt < oc.CLS_SPEEDSETTING_1) || (oc.CLS_SPEEDSETTING_X < Vt)) && (Vt != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Wt.fSpd = Vt;
    return oc.CLS_SUCCESS;
  };
  Nq.getFeedSpeed = function() {
    var Xt = this.p;
    var Yt = Xt.fSpd;
    return Yt;
  };
  Nq.setSlewSpeed = function(Zt) {
    var $t = this.p;
    if (((Zt < oc.CLS_SPEEDSETTING_1) || (oc.CLS_SPEEDSETTING_X < Zt)) && (Zt != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    $t.sSpd = Zt;
    return oc.CLS_SUCCESS;
  };
  Nq.getSlewSpeed = function() {
    var au = this.p;
    var bu = au.sSpd;
    return bu;
  };
  Nq.setBackupSpeed = function(cu) {
    var du = this.p;
    if (((cu < oc.CLS_SPEEDSETTING_1) || (oc.CLS_SPEEDSETTING_O < cu) || (cu == oc.CLS_SPEEDSETTING_9)) && (cu !=
        oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    du.bSpd = cu;
    return oc.CLS_SUCCESS;
  };
  Nq.getBackupSpeed = function() {
    var eu = this.p;
    var fu = eu.bSpd;
    return fu;
  };
  Nq.setPrintDarkness = function(gu) {
    var hu = this.p;
    if (((gu < 0) || (Rp < gu)) && (gu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    hu.pDkns = gu;
    return oc.CLS_SUCCESS;
  };
  Nq.getPrintDarkness = function() {
    var iu = this.p;
    var ju = iu.pDkns;
    return ju;
  };
  Nq.setDoubleHeat = function(ku) {
    var lu = this.p;
    if (((ku < 0) || (1 < ku)) && (ku != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    lu.dHt = ku;
    return oc.CLS_SUCCESS;
  };
  Nq.getDoubleHeat = function() {
    var mu = this.p;
    var nu = mu.dHt;
    return nu;
  };
  Nq.setVerticalOffset = function(ou) {
    var pu = this.p;
    if (((ou < 0) || (Qp < ou)) && (ou != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    pu.vOfst = ou;
    return oc.CLS_SUCCESS;
  };
  Nq.getVerticalOffset = function() {
    var qu = this.p;
    var ru = qu.vOfst;
    return ru;
  };
  Nq.setHorizontalOffset = function(su) {
    var tu = this.p;
    if (((su < 0) || (Qp < su)) && (su != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    tu.hOfst = su;
    return oc.CLS_SUCCESS;
  };
  Nq.getHorizontalOffset = function() {
    var uu = this.p;
    var vu = uu.hOfst;
    return vu;
  };
  Nq.setMediaHandling = function(wu) {
    var xu = this.p;
    if (((wu < oc.CLS_MEDIAHANDLING_NONE) || (oc.CLS_MEDIAHANDLING_REWIND < wu)) && (wu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    xu.mHd = wu;
    return oc.CLS_SUCCESS;
  };
  Nq.getMediaHandling = function() {
    var yu = this.p;
    var zu = yu.mHd;
    return zu;
  };
  Nq.setStartOffset = function(Au) {
    var Bu = this.p;
    if (((Au < Sp) || (Tp < Au)) && (Au != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Bu.stOfst = Au;
    return oc.CLS_SUCCESS;
  };
  Nq.getStartOffset = function() {
    var Cu = this.p;
    var Du = Cu.stOfst;
    return Du;
  };
  Nq.setStopOffset = function(Eu) {
    var Fu = this.p;
    if (((Eu < 0) || (Up < Eu)) && (Eu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Fu.spOfst = Eu;
    return oc.CLS_SUCCESS;
  };
  Nq.getStopOffset = function() {
    var Gu = this.p;
    var Hu = Gu.spOfst;
    return Hu;
  };
  Nq.setLabelSensor = function(Iu) {
    var Ju = this.p;
    if (((Iu < oc.CLS_SELSENSOR_NONE) || (oc.CLS_SELSENSOR_REFLECT < Iu)) && (Iu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    if (Iu == oc.CLS_SELSENSOR_NONE) {
      if (!((1 <= Ju.cML) && (Ju.cML <= Pp))) {
        return oc.CLS_E_ILLEGAL;
      }
    }
    Ju.lSns = Iu;
    return oc.CLS_SUCCESS;
  };
  Nq.getLabelSensor = function() {
    var Ku = this.p;
    var Lu = Ku.lSns;
    return Lu;
  };
  Nq.setPrintMethod = function(Mu) {
    var Nu = this.p;
    if (((Mu < oc.CLS_PRTMETHOD_TT) || (oc.CLS_PRTMETHOD_DT < Mu)) && (Mu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Nu.pMt = Mu;
    return oc.CLS_SUCCESS;
  };
  Nq.getPrintMethod = function() {
    var Ou = this.p;
    var Pu = Ou.pMt;
    return Pu;
  };
  Nq.setSensorLocation = function(Qu) {
    var Ru = this.p;
    if (((Qu < oc.CLS_SENS_LOCATION_FRONT) || (oc.CLS_SENS_LOCATION_ADJUSTABLE < Qu)) && (Qu != oc.CLS_PROPERTY_DEFAULT)) {
      return oc.CLS_E_ILLEGAL;
    }
    Ru.sLctn = Qu;
    return oc.CLS_SUCCESS;
  };
  Nq.getSensorLocation = function() {
    var Su = this.p;
    var Tu = Su.sLctn;
    return Tu;
  };
  Nq.getCommandInterpreterInAction = function() {
    var Uu = this.p;
    var Vu = Uu.stCIIA;
    return Vu;
  };
  Nq.getPaperError = function() {
    var Wu = this.p;
    var Xu = Wu.stPE;
    return Xu;
  };
  Nq.getRibbonEnd = function() {
    var Yu = this.p;
    var Zu = Yu.stRE;
    return Zu;
  };
  Nq.getBatchProcessing = function() {
    var $u = this.p;
    var av = $u.stBP;
    return av;
  };
  Nq.getPrinting = function() {
    var bv = this.p;
    var cv = bv.stPt;
    return cv;
  };
  Nq.getPause = function() {
    var dv = this.p;
    var ev = dv.stPs;
    return ev;
  };
  Nq.getWaitingForPeeling = function() {
    var fv = this.p;
    var gv = fv.stWFP;
    return gv;
  };
  if (!nc.citizen) {
    nc.citizen = {};
  }
  nc.citizen.LabelConst = oc;
  nc.citizen.LabelDesign = Mq;
  nc.citizen.LabelPrint = zs;
})(window);
