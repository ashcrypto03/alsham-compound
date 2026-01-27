# تعطيل عبارة «مدعوم بواسطة Chatwoot / Powered by Chatwoot» بالطريقة الرسمية (Self‑Hosted)

هذا الدليل يوثّق الطريقة **الرسمية** لتعطيل عبارة **Powered by Chatwoot** من ويدجت المحادثة عند استضافة Chatwoot ذاتيًا على VPS (Docker / Dokploy)، **بدون CSS** وبدون تعديل واجهة الودجت بطريقة قد تنكسر مع التحديثات.

> ملاحظة: قد تظهر العبارة بالعربية مثل **«مدعوم بواسطة Chatwoot»**. النتيجة واحدة.

---

## لماذا قد تختفي ثم تعود؟
قد تختفي العبارة ثم تعود بعد دقائق بسبب:
- كاش (Rails cache) على السيرفر.
- جلسة/تخزين محلي للودجت في المتصفح.
- إعادة تهيئة (re-hydration) من Chatwoot SDK.

الحل الصحيح هو: **تفعيل الميزة رسميًا على الحساب + مسح الكاش + إعادة تشغيل الحاويات**.

---

## المتطلبات
- وصول SSH إلى السيرفر.
- Chatwoot يعمل داخل Docker.
- معرفة اسم حاوية Chatwoot الخاصة بـ Rails (وليس Sidekiq).

---

## 1) الدخول إلى السيرفر عبر SSH
```bash
ssh user@SERVER_IP
```

---

## 2) معرفة أسماء حاويات Chatwoot
```bash
docker ps
```

سترى عادةً حاويتين لـ Chatwoot:
- `...chatwoot-rails-1` ✅ (هذه التي نستخدمها)
- `...chatwoot-sidekiq-1` ❌ (لا نحتاجها للكونسول)

---

## 3) الدخول إلى حاوية Rails (استخدم sh وليس bash)
بعض الصور لا تحتوي على `bash`، لذلك استخدم `sh`:

```bash
docker exec -it <chatwoot_rails_container_name> sh
```

ثم:
```bash
cd /app
```

---

## 4) فتح Rails Console
```bash
bundle exec rails c
```

إذا ظهر:
```
irb(main):001:0>
```
أنت داخل الكونسول بنجاح.

---

## 5) معرفة رقم الحساب (Account ID)
```ruby
Account.all.pluck(:id, :name)
```

اختر الـ ID الصحيح (في كثير من الحالات يكون 1).

---

## 6) تفعيل تعطيل البراندينغ رسميًا
في بعض إصدارات Chatwoot لا تكون الميزة مخزّنة كعمود باسم `feature_disable_branding` في قاعدة البيانات،
بل تكون **Feature Flag داخل bitmask** (مثل `feature_flags`) وتظهر لك كـ method مثل:
`feature_disable_branding?`

لذلك الأمر الصحيح للتفعيل هو تحديث الموديل:

```ruby
a = Account.find(<ACCOUNT_ID>)
a.update!(feature_disable_branding: true)
```

ثم تحقق:

```ruby
Account.find(<ACCOUNT_ID>).feature_disable_branding?
```

يجب أن تكون النتيجة:
```ruby
true
```

---

## 7) (اختياري) التأكد أن القيمة لا ترجع False تلقائيًا
هذا للتأكد أن شيئًا لا يعيد ضبطها:

```ruby
a = Account.find(<ACCOUNT_ID>)
a.feature_disable_branding?
sleep 20
a.reload.feature_disable_branding?
```

---

## 8) التأكد أن الودجت الذي تستخدمه هو نفس الـ Account و Token الصحيحين
أحيانًا يكون لديك أكثر من Inbox أو أكثر من WebWidget Token. في هذه الحالة قد تفعّل الميزة على حساب صحيح،
لكن موقعك يستخدم Token مختلف.

### 8.1) تحقق من أعمدة Inbox (للتأكد من وجود channel_id)
```ruby
Inbox.column_names.grep(/channel|account|type/i)
```

### 8.2) اعرف أعمدة جدول WebWidget (للتأكد من وجود website_token)
```ruby
ActiveRecord::Base.connection.columns(:channel_web_widgets).map(&:name)
```

يجب أن ترى ضمن القائمة:
- `website_token`
- `account_id`

### 8.3) الاستعلام الصحيح لعرض Inbox + Token + الحساب المرتبط
```ruby
Inbox.where(channel_type: "Channel::WebWidget")
    .joins("INNER JOIN channel_web_widgets cw ON cw.id = inboxes.channel_id")
    .pluck("inboxes.id, inboxes.name, inboxes.account_id, cw.website_token, cw.account_id")
```

تأكد أن:
- `cw.website_token` يطابق الـ token الموجود في كود موقعك.
- `inboxes.account_id` و `cw.account_id` يطابقان نفس `<ACCOUNT_ID>` الذي فعّلت عليه الميزة.

> إذا كان token في موقعك يخص Account مختلف: فعّل الميزة على ذلك الـ Account أيضًا بنفس خطوة (6).

---

## 9) الخروج من Rails Console
```ruby
exit
```

---

## 10) مسح Rails Cache (مهم لتثبيت الإعداد)
وأنت ما زلت داخل حاوية Rails (`/app`):

```bash
bundle exec rails runner "Rails.cache.clear"
```

ظهور رسائل WARN/INFO طبيعي.

---

## 11) إعادة تشغيل حاويات Chatwoot (Rails + Sidekiq)
نفّذ هذه الأوامر من السيرفر:

```bash
docker restart <chatwoot_rails_container_name>
docker restart <chatwoot_sidekiq_container_name>
```

---
---

## النتيجة
بعد تنفيذ الخطوات أعلاه:
- تختفي عبارة **Powered by Chatwoot / مدعوم بواسطة Chatwoot** نهائيًا من الودجت.
- الطريقة رسمية وآمنة ولا تعتمد على CSS.
- لا تنكسر مع تحديثات Chatwoot.

---

## قائمة أوامر مختصرة (للنسخ السريع)

### على السيرفر
```bash
docker ps
docker exec -it <chatwoot_rails_container_name> sh
cd /app
bundle exec rails c
```

### داخل Rails Console
```ruby
Account.all.pluck(:id, :name)
a = Account.find(<ACCOUNT_ID>)
a.update!(feature_disable_branding: true)
Account.find(<ACCOUNT_ID>).feature_disable_branding?

Inbox.where(channel_type: "Channel::WebWidget")
    .joins("INNER JOIN channel_web_widgets cw ON cw.id = inboxes.channel_id")
    .pluck("inboxes.id, inboxes.name, inboxes.account_id, cw.website_token, cw.account_id")

exit
```

### داخل الحاوية (بعد الخروج من rails c)
```bash
bundle exec rails runner "Rails.cache.clear"
exit
```

### على السيرفر
```bash
docker restart <chatwoot_rails_container_name>
docker restart <chatwoot_sidekiq_container_name>
```
