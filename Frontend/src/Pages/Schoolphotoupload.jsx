import React, { useEffect, useState } from 'react';
import {
  FaImages,
  FaCloudUploadAlt,
  FaTrashAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaSpinner,
} from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';
import { toast } from 'react-toastify';

const COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

// Deterministic gentle tilt per gallery card so the corkboard doesn't feel mechanical.
const TILTS = ['-3deg', '2deg', '-1.5deg', '3deg', '-2.5deg', '1.5deg'];

const SchoolPhotoUpload = () => {
  const [step, setStep] = useState('count');
  const [photoCount, setPhotoCount] = useState('');
  const [slots, setSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const {
    schoolPhotos,
    PhotoUpload,
    DeleteSchoolPhoto,
    getSchoolPhotos,
  } = UserData();

  // ----------------------------------------------------
  // DATABASE PHOTOS
  // ----------------------------------------------------

  const uploadedPhotos = schoolPhotos?.map((photo) => ({
    ...photo,
    url: photo.photoUrl?.[0]?.url,
  })) || [];

  // ----------------------------------------------------
  // GET PHOTOS WHEN PAGE LOADS
  // ----------------------------------------------------

  useEffect(() => {
    if (getSchoolPhotos) {
      getSchoolPhotos();
    }
  }, []);

  // ----------------------------------------------------
  // SELECT PHOTO COUNT
  // ----------------------------------------------------

  const handleCountSubmit = (e) => {
    e.preventDefault();

    const n = Number(photoCount);

    if (!n || n < 1) {
      toast.error('Please select number of photos');
      return;
    }

    setSlots(
      Array.from({ length: n }, () => ({
        file: null,
        preview: null,
      }))
    );

    setStep('upload');
  };

  // ----------------------------------------------------
  // FILE SELECT
  // ----------------------------------------------------

  const handleFileChange = (idx, fileList) => {
    const file = fileList?.[0] || null;

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    setSlots((prev) => {
      const next = [...prev];

      if (next[idx]?.preview) {
        URL.revokeObjectURL(next[idx].preview);
      }

      next[idx] = {
        file,
        preview: URL.createObjectURL(file),
      };

      return next;
    });
  };

  // ----------------------------------------------------
  // REMOVE SELECTED PHOTO
  // ----------------------------------------------------

  const removeSlotFile = (idx) => {
    setSlots((prev) => {
      const next = [...prev];

      if (next[idx]?.preview) {
        URL.revokeObjectURL(next[idx].preview);
      }

      next[idx] = {
        file: null,
        preview: null,
      };

      return next;
    });
  };

  // ----------------------------------------------------
  // CHANGE PHOTO COUNT
  // ----------------------------------------------------

  const changeCount = () => {
    slots.forEach((slot) => {
      if (slot.preview) {
        URL.revokeObjectURL(slot.preview);
      }
    });

    setSlots([]);
    setPhotoCount('');
    setStep('count');
  };

  // ----------------------------------------------------
  // COUNTS
  // ----------------------------------------------------

  const filledCount = slots.filter((slot) => slot.file).length;
  const allFilled = slots.length > 0 && filledCount === slots.length;

  // ----------------------------------------------------
  // UPLOAD
  // ----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allFilled) {
      toast.error(`Please upload all ${slots.length} photos before submitting`);
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      slots.forEach((slot, index) => {
        formData.append('file', slot.file, slot.file.name || `school-photo-${index + 1}.jpg`);
      });

      formData.append('count', String(slots.length));

      await PhotoUpload(formData);

      if (getSchoolPhotos) {
        await getSchoolPhotos();
      }

      slots.forEach((slot) => {
        if (slot.preview) {
          URL.revokeObjectURL(slot.preview);
        }
      });

      setSlots([]);
      setPhotoCount('');
      setStep('count');
    } catch (error) {
      console.log('Upload error:', error);
      toast.error('Failed to upload photos');
    } finally {
      setSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // DELETE DATABASE PHOTO
  // ----------------------------------------------------

  const handleDeletePhoto = async (photo) => {
    const photoId = photo.id || photo._id;

    if (!photoId) {
      toast.error('Photo ID not found');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this photo?');

    if (!confirmDelete) return;

    try {
      setDeletingId(photoId);

      await DeleteSchoolPhoto(photoId);

      if (getSchoolPhotos) {
        await getSchoolPhotos();
      }
    } catch (error) {
      console.log('Delete error:', error);
      toast.error('Failed to delete photo');
    } finally {
      setDeletingId(null);
    }
  };

  // ----------------------------------------------------
  // CLEANUP PREVIEW URLS
  // ----------------------------------------------------

  useEffect(() => {
    return () => {
      slots.forEach((slot) => {
        if (slot.preview) {
          URL.revokeObjectURL(slot.preview);
        }
      });
    };
  }, []);

  return (
    <TeacherLayout>
      <div className="spu-page min-h-full w-full py-8 px-4 sm:py-12">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

          .spu-page {
            --spu-ink: #1B2A4A;
            --spu-ink-deep: #101c34;
            --spu-marigold: #F5A623;
            --spu-marigold-deep: #D6912E;
            --spu-coral: #E85B45;
            --spu-leaf: #2F9E44;
            --spu-cream: #FBF6EC;
            --spu-line: #E4D9BE;
            --spu-muted: #8A7F65;
            font-family: 'Inter', system-ui, sans-serif;
            color: #2A2A2A;
            background:
              radial-gradient(circle at 1px 1px, rgba(27,42,74,0.06) 1px, transparent 0) 0 0/22px 22px,
              var(--spu-cream);
          }
          .spu-page .spu-display { font-family: 'Baloo 2', 'Inter', sans-serif; }

          @keyframes spu-rise {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .spu-rise { animation: spu-rise 0.5s ease both; }

          /* ---- Header ---- */
          .spu-header {
            background: linear-gradient(135deg, var(--spu-ink) 0%, var(--spu-ink-deep) 100%);
            position: relative;
            overflow: hidden;
          }
          .spu-header::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle, rgba(245,166,35,0.15) 1px, transparent 1px);
            background-size: 16px 16px;
            opacity: 0.5;
            pointer-events: none;
          }
          .spu-badge {
            background: var(--spu-marigold);
            box-shadow: 0 4px 14px rgba(245,166,35,0.35);
          }

          /* ---- Step progress ---- */
          .spu-progress { display: flex; align-items: center; gap: 8px; }
          .spu-step-pill {
            display: flex; align-items: center; gap: 6px;
            font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em;
            text-transform: uppercase;
            padding: 5px 10px 5px 6px;
            border-radius: 9999px;
            background: rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.55);
            transition: background 0.25s ease, color 0.25s ease;
          }
          .spu-step-pill.is-active {
            background: rgba(245,166,35,0.18);
            color: #fff;
          }
          .spu-step-num {
            width: 18px; height: 18px; border-radius: 9999px;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.65rem; background: rgba(255,255,255,0.18); color: #fff;
          }
          .spu-step-pill.is-active .spu-step-num { background: var(--spu-marigold); color: var(--spu-ink); }
          .spu-step-line { width: 20px; height: 1.5px; background: rgba(255,255,255,0.2); }

          /* ---- Count chips ---- */
          .spu-chip {
            font-family: 'Baloo 2', sans-serif;
            width: 64px; height: 64px;
            border-radius: 14px;
            border: 2px solid var(--spu-line);
            background: #fff;
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--spu-ink);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: all 0.15s ease;
            cursor: pointer;
          }
          .spu-chip span { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 600; color: var(--spu-muted); margin-top: 1px; }
          .spu-chip:hover { border-color: var(--spu-marigold); transform: translateY(-2px); }
          .spu-chip.is-selected {
            background: var(--spu-ink);
            border-color: var(--spu-ink);
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(27,42,74,0.25);
          }
          .spu-chip.is-selected span { color: var(--spu-marigold); }

          /* ---- Upload slot card ---- */
          .spu-slot {
            position: relative;
            border: 1px solid var(--spu-line);
            border-radius: 16px;
            padding: 14px;
            background: #fff;
          }
          .spu-tape {
            position: absolute;
            top: -8px; left: 20px;
            width: 46px; height: 18px;
            background: rgba(245,166,35,0.55);
            border: 1px solid rgba(245,166,35,0.7);
            transform: rotate(-6deg);
            box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          }
          .spu-dropzone {
            height: 190px;
            border: 2px dashed var(--spu-line);
            border-radius: 12px;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
            color: var(--spu-muted);
            cursor: pointer;
            transition: all 0.2s ease;
            background: repeating-linear-gradient(135deg, rgba(27,42,74,0.015) 0 10px, transparent 10px 20px);
          }
          .spu-dropzone:hover { border-color: var(--spu-marigold); background: #FBF5E6; color: var(--spu-ink); }
          .spu-flag {
            position: absolute; bottom: 10px; left: -6px;
            background: var(--spu-leaf); color: #fff;
            font-size: 0.62rem; font-weight: 700;
            padding: 4px 10px 4px 8px;
            display: flex; align-items: center; gap: 4px;
            border-radius: 0 9999px 9999px 0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          }
          .spu-remove-btn {
            position: absolute; top: 10px; right: 10px;
            width: 32px; height: 32px; border-radius: 9999px;
            background: var(--spu-coral); color: #fff;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 3px 8px rgba(0,0,0,0.2);
            transition: transform 0.15s ease;
          }
          .spu-remove-btn:hover { transform: scale(1.08); }

          .spu-submit-btn {
            transition: all 0.15s ease;
          }
          .spu-submit-btn.is-ready:hover { background: var(--spu-marigold-deep); }

          /* ---- Corkboard gallery ---- */
          .spu-board {
            background:
              radial-gradient(circle at 1px 1px, rgba(27,42,74,0.08) 1px, transparent 0) 0 0/18px 18px,
              #F1EADA;
            border-radius: 16px;
            padding: 28px;
          }
          .spu-polaroid {
            background: #fff;
            padding: 10px 10px 34px 10px;
            border-radius: 4px;
            box-shadow: 0 6px 16px rgba(27,42,74,0.15);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            position: relative;
          }
          .spu-polaroid:hover {
            transform: rotate(0deg) scale(1.03) translateY(-4px) !important;
            box-shadow: 0 14px 28px rgba(27,42,74,0.22);
            z-index: 2;
          }
          .spu-pin {
            position: absolute; top: -9px; left: 50%; transform: translateX(-50%);
            width: 16px; height: 16px; border-radius: 9999px;
            background: radial-gradient(circle at 35% 30%, #ffd479, var(--spu-marigold-deep));
            box-shadow: 0 3px 5px rgba(0,0,0,0.3);
            border: 1px solid rgba(0,0,0,0.05);
          }
          .spu-polaroid-caption {
            position: absolute; bottom: 8px; left: 12px; right: 12px;
            display: flex; align-items: center; justify-content: space-between;
          }
          .spu-polaroid-del {
            position: absolute; top: 16px; right: 16px;
            width: 34px; height: 34px; border-radius: 9999px;
            background: rgba(232,91,69,0.94); color: #fff;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transform: translateY(-4px);
            transition: all 0.18s ease;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
          }
          .spu-polaroid:hover .spu-polaroid-del { opacity: 1; transform: translateY(0); }

          @media (prefers-reduced-motion: reduce) {
            .spu-rise, .spu-polaroid, .spu-chip, .spu-remove-btn { animation: none !important; transition: none !important; }
          }
        `}</style>

        <div className="w-full mx-auto">
          {/* ================= MAIN CARD ================= */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* ---- Header ---- */}
            <div className="spu-header px-6 sm:px-8 py-6 relative">
              <div className="relative flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="spu-badge w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                    <FaImages className="text-[var(--spu-ink)]" size={20} />
                  </div>
                  <div>
                    <h1 className="spu-display text-xl sm:text-2xl font-bold text-white">
                      School Photo Upload
                    </h1>
                    <p className="text-sm text-white/70 mt-1">
                      {step === 'count'
                        ? 'Start by choosing how many photos you want to upload'
                        : `Uploading ${slots.length} photo${slots.length > 1 ? 's' : ''} · ${filledCount}/${slots.length} added`}
                    </p>
                  </div>
                </div>

                <div className="spu-progress">
                  <span className={`spu-step-pill ${step === 'count' ? 'is-active' : ''}`}>
                    <span className="spu-step-num">1</span>
                    Choose count
                  </span>
                  <span className="spu-step-line" />
                  <span className={`spu-step-pill ${step === 'upload' ? 'is-active' : ''}`}>
                    <span className="spu-step-num">2</span>
                    Add photos
                  </span>
                </div>
              </div>
            </div>

            {/* ================= STEP 1 - SELECT COUNT ================= */}
            {step === 'count' && (
              <form onSubmit={handleCountSubmit} className="spu-rise px-6 sm:px-8 py-10 flex flex-col items-center text-center">
                <label className="spu-display text-lg sm:text-xl font-bold text-[var(--spu-ink)] mb-1">
                  How many photos do you want to upload?
                </label>
                <p className="text-sm text-[var(--spu-muted)] mb-6">Pick a number to set up that many upload slots</p>

                <div className="flex flex-wrap justify-center gap-3 max-w-md">
                  {COUNT_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPhotoCount(String(n))}
                      className={`spu-chip ${String(photoCount) === String(n) ? 'is-selected' : ''}`}
                      aria-pressed={String(photoCount) === String(n)}
                    >
                      {n}
                      <span>photo{n > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full max-w-xs py-3 rounded-lg font-semibold text-[var(--spu-ink)] bg-[var(--spu-marigold)] hover:bg-[var(--spu-marigold-deep)] active:scale-[0.99] transition-all shadow-sm"
                >
                  Continue
                </button>
              </form>
            )}

            {/* ================= STEP 2 - UPLOAD PHOTOS ================= */}
            {step === 'upload' && (
              <form onSubmit={handleSubmit} className="spu-rise px-6 sm:px-8 py-7">
                <button
                  type="button"
                  onClick={changeCount}
                  disabled={submitting}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[var(--spu-muted)] hover:text-[var(--spu-ink)] transition mb-5 disabled:opacity-50"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  Change number of photos
                </button>

                <div className="grid sm:grid-cols-2 gap-5">
                  {slots.map((slot, idx) => (
                    <div key={idx} className="spu-slot">
                      <span className="spu-tape" aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--spu-muted)] mb-2 block">
                        Photo {idx + 1}
                      </span>

                      {slot.preview ? (
                        <div className="relative">
                          <img
                            src={slot.preview}
                            alt={`Selected ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-lg border border-[var(--spu-line)]"
                          />
                          <button
                            type="button"
                            onClick={() => removeSlotFile(idx)}
                            disabled={submitting}
                            className="spu-remove-btn disabled:opacity-50"
                            aria-label={`Remove photo ${idx + 1}`}
                          >
                            <FaTrashAlt className="w-3 h-3" />
                          </button>
                          <div className="spu-flag">
                            <FaCheckCircle className="w-2.5 h-2.5" />
                            Added
                          </div>
                        </div>
                      ) : (
                        <label htmlFor={`photo-input-${idx}`} className="spu-dropzone">
                          <FaCloudUploadAlt className="w-7 h-7" />
                          <span className="text-xs font-semibold">Tap to upload</span>
                          <span className="text-[10px] text-[var(--spu-muted)]">JPG, PNG, WEBP · up to 10MB</span>
                        </label>
                      )}

                      <input
                        id={`photo-input-${idx}`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        capture="environment"
                        onChange={(e) => handleFileChange(idx, e.target.files)}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!allFilled || submitting}
                  className={`spu-submit-btn mt-7 w-full py-3 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-2 ${
                    allFilled && !submitting
                      ? 'is-ready text-[var(--spu-ink)] bg-[var(--spu-marigold)] active:scale-[0.99]'
                      : 'text-[var(--spu-muted)] bg-[#EFE7D2] cursor-not-allowed'
                  }`}
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Uploading...
                    </>
                  ) : allFilled ? (
                    <>
                      <FaCloudUploadAlt />
                      Submit Photos
                    </>
                  ) : (
                    `Add all ${slots.length} photos to continue`
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ================= UPLOADED DATABASE PHOTOS ================= */}
          {uploadedPhotos.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="spu-header px-6 sm:px-8 py-5 flex items-center justify-between relative flex-wrap gap-3">
                <div className="relative flex items-center gap-3">
                  <div className="spu-badge w-10 h-10 rounded-lg flex items-center justify-center">
                    <FaImages className="text-[var(--spu-ink)]" />
                  </div>
                  <div>
                    <h2 className="spu-display text-lg font-bold text-white">Uploaded Photos</h2>
                    <p className="text-xs text-white/70">Pinned to your school's photo board</p>
                  </div>
                </div>
                <span className="relative bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="spu-board grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {uploadedPhotos.map((photo, index) => {
                    const photoId = photo.id || photo._id;
                    const tilt = TILTS[index % TILTS.length];

                    if (!photo.url) return null;

                    return (
                      <div
                        key={photoId || index}
                        className="spu-polaroid spu-rise"
                        style={{ transform: `rotate(${tilt})`, animationDelay: `${index * 60}ms` }}
                      >
                        <span className="spu-pin" aria-hidden="true" />
                        <img
                          src={photo.url}
                          alt={`School photo ${index + 1}`}
                          className="w-full h-52 object-cover rounded-sm"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.closest('.spu-polaroid').style.display = 'none';
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(photo)}
                          disabled={deletingId === photoId}
                          className="spu-polaroid-del disabled:opacity-60"
                          title="Delete photo"
                        >
                          {deletingId === photoId ? <FaSpinner className="animate-spin" /> : <FaTrashAlt size={13} />}
                        </button>

                        <div className="spu-polaroid-caption">
                          <span className="spu-display text-sm font-semibold text-[var(--spu-ink)]">
                            Photo {index + 1}
                          </span>
                          <FaCheckCircle className="text-[var(--spu-leaf)]" size={13} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= NO PHOTOS ================= */}
          {uploadedPhotos.length === 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--spu-cream)] border border-[var(--spu-line)] flex items-center justify-center mx-auto mb-4">
                <FaImages className="text-[var(--spu-muted)]" size={26} />
              </div>
              <h3 className="spu-display font-bold text-[var(--spu-ink)]">No photos yet</h3>
              <p className="text-sm text-[var(--spu-muted)] mt-1">Photos you upload will be pinned here.</p>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default SchoolPhotoUpload;