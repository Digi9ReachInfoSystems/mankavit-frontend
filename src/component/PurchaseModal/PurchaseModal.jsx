import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Select } from "antd";

import {
    ModalBackdrop,
    ModalBox,
    CloseBtn,
    Title,
    Label,
    ApplyBtn,
    PriceRow,
    CouponGrid,
    CouponCard,
    CouponImage,
    CourseCard,
    CourseImage,
    CourseInfo,
    CourseTitle,
    CoursePrice,
    InputField
} from "./PurchaseModal.styles";

import { getCookiesData } from "../../utils/cookiesService";
import { getUserCoupon, validateCoupon } from "../../api/couponApi";
import PaymentComponent from "../../module/admin/component/PaymentComponent/PaymentComponent";

export default function PurchaseModal({ onClose, course }) {
    // console.log("course", course);
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [coupons, setCoupons] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedCouponCodeId, setSelectedCouponCodeId] = useState(null);

    const basePrice = course.discountActive ? course.discountPrice : course.price;
    const total = basePrice - discount;

    useEffect(() => {
        const apiCaller = async () => {
            try {
                const cookieData = await getCookiesData();
                setUserId(cookieData.userId);
                const response = await getUserCoupon(cookieData.userId);
                const preparedData = response.coupons.map((coupon) => ({
                    _id: coupon._id,
                    code: coupon.coupon_code,
                    label: coupon.coupon_name,
                    type: coupon.coupon_type,
                    value: coupon.discount_amount,
                    image: coupon.coupon_image,
                }));
                setCoupons(preparedData);
            } catch (error) {
                // // console.error("Error fetching coupons:", error);
            }
        };
        apiCaller();
    }, []);

    const handleApplyCoupon = async () => {

        // const selected = coupons.find((c) => c.code === selectedCoupon);
        if (!selectedCoupon) return toast.error("Please Enter Coupon Code");

        try {
            // console.log({ userId, couponCode: selectedCoupon });
            const response = await validateCoupon({ userId, couponCode: selectedCoupon });
            console.log(response);  
            if (response.success) {
                const finalPrice = basePrice - response.discount;
                if (finalPrice < 0) {
                    toast.error("Discount amount is greater than course price , please select another coupon");
                    return;
                }
                setDiscount(response.discount);
                setSelectedCouponCodeId(response.couponId);
                toast.success("Coupon applied successfully!");
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Coupon code is not valid");
            } else if (error.response.status === 404) {
                toast.error("Coupon code is not valid");
            } else {
                toast.error("Coupon code is not valid");

            }
        }


    };

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <CloseBtn onClick={onClose}>×</CloseBtn>
                <Title>Purchase Summary</Title>

                <CourseCard>
                    <CourseImage
                        src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${course.image}` }
                        alt="Course"
                    />
                    <CourseInfo>
                        <CourseTitle>{course.courseDisplayName}</CourseTitle>
                        <CoursePrice>
                            Price: ₹{basePrice}
                            {course.discountActive && (
                                <span style={{ textDecoration: "line-through", marginLeft: "10px", color: "#999" }}>
                                    ₹{course.price}
                                </span>
                            )}
                        </CoursePrice>
                    </CourseInfo>
                </CourseCard>

                {/* <Label>Available Coupons:</Label>
                <CouponGrid>
                    {coupons.map((coupon) => (
                        <CouponCard
                            key={coupon.code}
                            selected={selectedCoupon === coupon.code}
                            onClick={() => setSelectedCoupon(coupon.code)}
                        >
                            <CouponImage
                                src={coupon.image || "https://via.placeholder.com/50?text=💳"}
                                alt={coupon.code}
                            />
                            <strong>{coupon.label}</strong>
                            <p style={{ fontSize: "14px", margin: "4px 0" }}>
                                {coupon.type === "percentage"
                                    ? `${coupon.value}% OFF`
                                    : `₹${coupon.value} OFF`}
                            </p>
                        </CouponCard>
                    ))}
                </CouponGrid> */}

                <Label>Unlock your discount! Enter coupon code ✨</Label>
                <InputField
                    type="text"
                    value={selectedCoupon}
                    onChange={(e) => setSelectedCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    style={{ width: "100%", padding: "10px" }}
                    max={5}
                    min={5}
                />
                {/* <Select style={{ width: "100%" }} value={selectedCoupon} onChange={(e) => setSelectedCoupon(e)}>
                    <option value="">-- Select a coupon --</option>
                    {coupons.map((coupon, index) => (
                        <option key={index} value={coupon.code}>
                            {coupon.label} ({coupon.code})
                        </option>
                    ))}
                </Select> */}
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "transparent",
                        margin: "16px 0",
                    }}
                ></div>

                <ApplyBtn onClick={handleApplyCoupon}>Apply Coupon</ApplyBtn>

                {discount > 0 && (
                    <>
                        <Label>Discount: ₹{discount}</Label>
                        <PriceRow>
                            <strong>Total:</strong>
                            <strong>₹{total}</strong>
                        </PriceRow>
                    </>
                )}

                <PaymentComponent
                    userId={userId}
                    amount={total}
                    discountActive={course.discountActive || discount > 0}
                    actualPrice={course.price}
                    discountPrice={course.discountPrice + discount}
                    courseRef={course?._id}
                    couponApplied={discount > 0}
                    couponCode={selectedCouponCodeId}
                    couonDiscount={discount}
                />
            </ModalBox>
        </ModalBackdrop>
    );
}
